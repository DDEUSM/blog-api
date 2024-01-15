import { PostApplicationDto } from "../../../application/dtos/post-dtos/post-dtos";

export interface IPostsRepository
{
    find (postParams: any): Promise<PostApplicationDto[]>;
    findById (id: number): Promise<PostApplicationDto>;
    savePost (newPost: PostApplicationDto): Promise<void>;
}