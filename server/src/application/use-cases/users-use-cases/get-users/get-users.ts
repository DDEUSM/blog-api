import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserApplicationDto, UserInputDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUsers
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (userParams: any): Promise<UserApplicationDto[]>
    {                
        return await this.usersRepository.find(userParams);
    }
}