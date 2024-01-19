import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUsers
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (userParams: any): Promise<UserDto[]>
    {                
        return await this.usersRepository.find(userParams);
    }
}