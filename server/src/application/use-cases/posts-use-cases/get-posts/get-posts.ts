import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";
import InputsCleaner from "../../../../utils/cleanInputs";
import { PostDto } from "../../../dtos/post-dtos/post-dtos";

export class GetPosts
{
    constructor(
        private postsRepository: IPostsRepository
    ){}

    async execute (postsParams: any): Promise<PostDto[]>
    {        
        return await this.postsRepository.find(postsParams);
    }
}