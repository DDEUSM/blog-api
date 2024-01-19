import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUserByEmail
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (email: string): Promise<UserDto>
    {
        return await this.usersRepository.findUserByEmail(email);
    }
}