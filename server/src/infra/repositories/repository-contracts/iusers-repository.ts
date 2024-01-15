import { UserApplicationDto } from "../../../application/dtos/user-dtos/user-dtos";

export interface IUsersRepository
{
    saveUser (newUser: UserApplicationDto): Promise<void>;
    find (userParams: any): Promise<UserApplicationDto[]>;
    findUserById (id: number): Promise<UserApplicationDto>;
    findUserByEmail (email: string): Promise<UserApplicationDto>;
}