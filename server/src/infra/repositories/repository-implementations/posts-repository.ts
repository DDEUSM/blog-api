import { PrismaClient } from "@prisma/client";
import { PostDto } from "../../../application/dtos/post-dto"
import { IPostsRepository } from "../repository-contracts/iposts-repository";
import { ApiError } from "../../../domain/errors/api-error";

export class PostsRepository implements IPostsRepository
{
    constructor (
        private connection: PrismaClient
    ){}
    
    async find (postsParams: any): Promise<PostDto[]>
    {        
        const posts = await this.connection.post.findMany();

        if (!posts.length)
        {
            throw new ApiError(404, "Posts not be found!");
        }
        
        return posts;
    }

    async findById (id: number): Promise<PostDto>
    {
        const singlePost = await this.connection.post.findUnique({
            where: {
                id: id
            }
        });

        if (!singlePost)
        {
            throw new ApiError(404, "Post not be found!");
        }        
    
        return singlePost;
    }

}