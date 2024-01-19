import { UserDto } from "../../../application/dtos/user-dtos/user-dtos";

export interface IUsersRepository
{   
    userLogin (userCredentials: any): Promise<any>; 
    find (userParams: any): Promise<UserDto[]>;
    findUserById (id: number): Promise<UserDto>;
    findUserByEmail (email: string): Promise<UserDto>;
    deleteUser (id: number): Promise<void>;
    updateUser (id: number, newUserData: any): Promise<void>;
    saveUser (newUser: UserDto): Promise<void>;
}