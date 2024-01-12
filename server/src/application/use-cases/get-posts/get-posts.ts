import { IPostsRepository } from "../../../infra/repositories/repository-contracts/iposts-repository";
import cleanInputs from "../../../utils/cleanInputs";
import { PostDto } from "../../dtos/post-dto";

export class GetPosts
{
    constructor(
        private postsRepository: IPostsRepository
    ){}

    async execute (postsParams: any): Promise<PostDto[]>
    {
        const cleanParams = cleanInputs(postsParams);
        return await this.postsRepository.find(cleanParams);
    }
}