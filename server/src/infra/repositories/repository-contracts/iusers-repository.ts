import { UserDto } from "../../../application/dtos/user-dtos/user-dtos";

export interface IUsersRepository
{   
    userLogin (userCredentials: any): Promise<any>; 
    userRefreshToken (refreshToken: string): Promise<string>;
    find (userParams: any): Promise<UserDto[]>;
    findUserById (id: string): Promise<UserDto>;
    findUserByEmail (email: string): Promise<UserDto>;
    deleteUser (id: string): Promise<void>;
    updateUser (id: string, newUserData: any): Promise<void>;
    saveUser (newUser: UserDto): Promise<void>;
}