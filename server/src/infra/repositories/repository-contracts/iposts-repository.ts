import { DynamicPostDto, PostDto } from "../../../application/dtos/post-dtos/post-dtos";
import { DynamicUserDto } from "../../../application/dtos/user-dtos/user-dtos";

export interface IPostsRepository
{
    find (postParams: DynamicPostDto): Promise<PostDto[]>;
    findById (id: string): Promise<PostDto>;
    findAuthorByPostId (ownerId: string): Promise<DynamicUserDto>;
    savePost (newPost: PostDto): Promise<void>;
    updatePost (id: string, newPostData: DynamicPostDto): Promise<void>;
    deletePost (id: string): Promise<void>;
}