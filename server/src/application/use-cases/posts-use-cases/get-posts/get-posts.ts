import { IPostsRepository } from "../../../../infra/repositories/repository-contracts/iposts-repository";
import InputsCleaner from "../../../../utils/cleanInputs";
import { PostApplicationDto } from "../../../dtos/post-dtos/post-dtos";

export class GetPosts
{
    constructor(
        private postsRepository: IPostsRepository
    ){}

    async execute (postsParams: any): Promise<PostApplicationDto[]>
    {        
        return await this.postsRepository.find(postsParams);
    }
}