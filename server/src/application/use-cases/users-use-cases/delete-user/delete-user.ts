import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";

export class DeleteUser
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (id: number): Promise<void>
    {
        await this.usersRepository.deleteUser(id);
    }
}