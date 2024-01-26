import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";

export class DeletePost
{
    constructor (
        private postsRepository: IPostsRepository
    ){}

    async execute (id: string): Promise<void>
    {
        await this.postsRepository.deletePost(id);
    }
}