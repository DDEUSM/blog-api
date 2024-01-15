import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../repository-contracts/iusers-repository";
import { UserApplicationDto, UserDatabaseDto, UserInputDto } from "../../../application/dtos/user-dtos/user-dtos";
import { ApiError } from "../../../domain/errors/api-error";


export class UsersRepository implements IUsersRepository
{
    constructor (
        private connection: PrismaClient
    ){}

    async saveUser (newUser: UserApplicationDto): Promise<void>
    {
        const userHasExists = await this.connection.user.findFirst({
            where: { email: newUser.email }
        });

        if (userHasExists)
        {
            throw new ApiError(400, "User has exists!");
        }

        const userAdapted = new UserDatabaseDto ({
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            email: newUser.email,
            gender: newUser.gender,
            id: newUser.id            
        });

        await this.connection.user.create({
            data: userAdapted.getValues()
        });
    }


    async find (userParams: any): Promise<UserApplicationDto[]> 
    {
        const userInput = new UserInputDto ({
            first_name: userParams.firstName,
            last_name: userParams.lastName,
            email: userParams.email,
            gender: userParams.gender,
            id: userParams.id
        });
        
        const users = await this.connection.user.findMany({
            where: userInput.getValues()
        });

        if (!users.length)
        {
            throw new ApiError(404, "Users not found!");
        }

        const usersAdapted = users.map(user => 
        {
            return new UserApplicationDto ({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                gender: user.gender,
                id: user.id            
            });            
        });

        return usersAdapted;
    }


    async findUserById(id: number): Promise<UserApplicationDto> 
    {
        const user = await this.connection.user.findFirst({
            where: { id }
        });

        if (!user)
        {
            throw new ApiError(404, "User not found!");
        }

        const userAdapted = new UserApplicationDto ({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            gender: user.gender,
            id: user.id         
        });

        return userAdapted;
    }

    
    async findUserByEmail (email: string): Promise<UserApplicationDto>
    {
        const user = await this.connection.user.findUnique({
            where: { email }
        });

        if (!user)
        {
            throw new ApiError(404, "User not found!");
        }

        const userMapped = new UserApplicationDto ({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            gender: user.gender,
            id: user.id
        });

        return userMapped;
    }
}