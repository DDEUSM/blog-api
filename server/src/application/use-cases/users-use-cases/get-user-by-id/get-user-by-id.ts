import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserApplicationDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUserById
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (id: number): Promise<UserApplicationDto>
    {
        return await this.usersRepository.findUserById(id);
    }
}