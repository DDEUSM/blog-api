import { PostDto } from "../../../application/dtos/post-dto";

export interface IPostsRepository
{
    find (postParams: any): Promise<PostDto[]>;
    findById (id: number): Promise<PostDto>;
}