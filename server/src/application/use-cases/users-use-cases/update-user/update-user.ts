import { IUsersRepository } from "../../../../infra/repositories/repository-contracts/iusers-repository";

export class UpdateUser
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (id: number, newUserData: any): Promise<void>
    {
        await this.usersRepository.updateUser(id, newUserData);
    }
}