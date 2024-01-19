import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";

export class UpdatePost
{
    constructor (
        private postsRepository: IPostsRepository
    ){}

    async execute (id: number, newPostData: any): Promise<void>
    {
        await this.postsRepository.updatePost(id, newPostData);
    }
}