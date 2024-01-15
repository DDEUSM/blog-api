import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";
import { PostApplicationDto } from "../../../dtos/post-dtos/post-dtos";

export class CreatePost
{
    constructor (
        private PostsRepository: IPostsRepository
    ){}

    async execute (newPost: PostApplicationDto): Promise<void>
    {
        await this.PostsRepository.savePost(newPost);
    }
}