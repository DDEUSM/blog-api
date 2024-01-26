import { Prisma, PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../repository-contracts/iusers-repository";
import { UserDto, DynamicUserDto } from "../../../application/dtos/user-dtos/user-dtos";
import { ApiError } from "../../../domain/errors/api-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PostgresUserAdapter } from "../../interface-adapters/postgres/postgres-adapters";
import env from "../../../env";

export class UsersRepository implements IUsersRepository
{
    constructor (
        private connection: PrismaClient
    ){}

    async userLogin (
        userCredentials: { email: string, password: string }
    ): Promise<any>
    {
        const { email, password } = userCredentials;        
        const foundUser = await this.connection.user.findUnique({
            where: { email }
        });
        if (!foundUser)
        {
            throw new ApiError(401, "Incorret Credentials");
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password_hash);
        if (!passwordMatch)
        {
            throw new ApiError(401, "Incorrect Credentials")
        }         
        const newToken = jwt.sign (
            { id: foundUser.id },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign (
            { id: foundUser.id },
            env.REFRESH_TOKEN_SECRET,
            { expiresIn: `1d` }
        );
        await this.connection.user.update({
            where: { id: foundUser.id },
            data: { refresh_token: refreshToken }
        });
        return { 
            accessToken: newToken,
            refreshToken
        }
    }


    async userRefreshToken (refreshToken: string): Promise<string>
    {
        const foundUser = await this.connection.user.findUnique({
            where: { refresh_token: refreshToken }
        });
        if (!foundUser)
        {
            throw new ApiError(401,"");
        }
        jwt.verify(
            foundUser.refresh_token,
            env.REFRESH_TOKEN_SECRET,
            (error: any, decoded) => {
                if (error)
                {
                    throw new ApiError(401, "");
                }                
            }
        );
        const newAccessToken = jwt.sign(
            { email: foundUser.email },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        return newAccessToken
    }


    async find (userParams: any): Promise<UserDto[]> 
    {
        const userParamsAdapted = PostgresUserAdapter.toDatabase(userParams);        
        const users = await this.connection.user.findMany({
            where: userParamsAdapted
        });
        if (!users.length)
        {
            throw new ApiError(404, "Users not found!");
        }
        return users.map(user => {
            return PostgresUserAdapter.toApplication(user);
        });
    }


    async findUserById(id: string): Promise<UserDto> 
    {
        const user = await this.connection.user.findFirst({
            where: { id }
        });
        if (!user)
        {
            throw new ApiError(404, "User not found!");
        }
        return PostgresUserAdapter.toApplication(user);
    }

    
    async findUserByEmail (email: string): Promise<UserDto>
    {
        const user = await this.connection.user.findUnique({
            where: { email }
        });

        if (!user)
        {
            throw new ApiError(404, "User not found!");
        }        
        return PostgresUserAdapter.toApplication(user);;
    }


    async saveUser (newUserParams: UserDto): Promise<void>
    {
        const userHasExists = await this.connection.user.findFirst({
            where: { email: newUserParams.email }
        });

        if (userHasExists)
        {
            throw new ApiError(422, "User has exists!");
        }        
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(newUserParams.passwordHash, salt);
        const newUser = { ...newUserParams, passwordHash: hash };

        const userAdapted = PostgresUserAdapter.toDatabase(newUser);

        await this.connection.user.create({
            data: userAdapted
        });
    }


    async updateUser(id: string, newUserData: any): Promise<void> 
    {
        const userInputsAdapted = PostgresUserAdapter.toDatabase(newUserData); 
        const foundUser = await this.connection.user.findUnique({
            where: { id }
        });      
        
        if (!foundUser)
        {
            throw new ApiError(404, "User not exists!");
        }

        await this.connection.user.update({
            where: { id },
            data: userInputsAdapted
        })
    }


    async deleteUser(id: string): Promise<void> 
    {
        await this.connection.user.delete({
            where: { id }
        });
    }
}