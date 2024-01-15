import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";
import { UserApplicationDto } from "../../../dtos/user-dtos/user-dtos";

export class GetUserByEmail
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (email: string): Promise<UserApplicationDto>
    {
        return await this.usersRepository.findUserByEmail(email);
    }
}