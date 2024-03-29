import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserDto } from "../../../dtos/user-dtos/user-dtos";

export class CreateUser
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (newUser: UserDto): Promise<void>
    {
        await this.usersRepository.saveUser(newUser);
    }
}