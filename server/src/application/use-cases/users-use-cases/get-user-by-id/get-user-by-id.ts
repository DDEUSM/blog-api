import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUserById
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (id: string): Promise<UserDto>
    {
        return await this.usersRepository.findUserById(id);
    }
}