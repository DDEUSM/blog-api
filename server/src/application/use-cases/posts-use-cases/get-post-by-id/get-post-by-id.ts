import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";
import { PostDto } from "../../../dtos/post-dtos/post-dtos";

export class GetPostsById
{
    constructor (
        private postsRepository: IPostsRepository
    ){}

    async execute (id: string): Promise<PostDto>
    {
        return await this.postsRepository.findById(id);
    }
}