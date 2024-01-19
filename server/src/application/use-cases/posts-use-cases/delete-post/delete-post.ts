import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";

export class DeletePost
{
    constructor (
        private postsRepository: IPostsRepository
    ){}

    async execute (id: number): Promise<void>
    {
        await this.postsRepository.deletePost(id);
    }
}