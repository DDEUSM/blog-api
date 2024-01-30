import { IUsersRepository } from "../../../infra/repositories/repository-contracts/iusers-repository";

export class RefreshToken
{
    constructor (
        private usersReposiotry: IUsersRepository
    ){}

    async execute (refreshToken: string)
    {
        return await this.usersReposiotry.userRefreshToken(refreshToken);
    }
}