import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";
import { PostDto } from "../../../dtos/post-dtos/post-dtos";

export class CreatePost
{
    constructor (
        private PostsRepository: IPostsRepository
    ){}

    async execute (newPost: PostDto): Promise<void>
    {
        await this.PostsRepository.savePost(newPost);
    }
}