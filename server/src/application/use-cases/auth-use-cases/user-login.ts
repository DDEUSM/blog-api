import { IUsersRepository } from "../../../infra/repositories/repository-contracts/iusers-repository";

export class UserLogin
{
    constructor (
        private usersRepository: IUsersRepository
    ){}

    async execute (
        UserCredentials: { email: string, password: string }
    ): Promise<{ accessToken: string, refreshToken: string }>
    {
        return await this.usersRepository.userLogin(UserCredentials);
    }
}