import { DynamicPostDto, PostDto } from "../../../application/dtos/post-dtos/post-dtos";

export interface IPostsRepository
{
    find (postParams: DynamicPostDto): Promise<PostDto[]>;
    findById (id: number): Promise<PostDto>;
    savePost (newPost: PostDto): Promise<void>;
    updatePost (id: number, newPostData: DynamicPostDto): Promise<void>;
    deletePost (id: number): Promise<void>;
}