import { PrismaClient } from "@prisma/client";
import { DynamicPostDto, PostDto } from "../../../application/dtos/post-dtos/post-dtos"
import { IPostsRepository } from "../repository-contracts/iposts-repository";
import { ApiError } from "../../../domain/errors/api-error";
import { PostgresPostsAdapter, PostgresUserAdapter } from "../../interface-adapters/postgres/postgres-adapters";
import { DynamicUserDto, UserDto } from "../../../application/dtos/user-dtos/user-dtos";


export class PostsRepository implements IPostsRepository
{
    constructor (
        private connection: PrismaClient
    ){}
    
    async find (postsParams: DynamicPostDto): Promise<PostDto[]>
    {   
        const postInput = PostgresPostsAdapter.toDatabase(postsParams);
        const posts = await this.connection.post.findMany({
            where: postInput
        });        
        if (!posts.length)
        {            
            throw new ApiError(404, "Posts not be found!");
        }
        return posts.map(post => {
            return PostgresPostsAdapter.toApplication(post)
        });
    }

    
    async findById (id: string): Promise<PostDto>
    {
        const singlePost = await this.connection.post.findUnique({
            where: { id }
        });
        if (!singlePost)
        {
            throw new ApiError(404, "Post not be found!");
        }            
        return PostgresPostsAdapter.toApplication(singlePost);;
    }


    async findAuthorByPostId (id: string): Promise<DynamicUserDto>
    {
        const foundAuthor = await this.connection.post.findFirst({            
            where: { id },
            include : {
                author: {
                    select: { 
                        id: true 
                    }
                }
            }
        });     
        if (!foundAuthor)
        {
            throw new ApiError(404, "user not founded");
        }
        const ownerAdapted = {
            id: foundAuthor.id,
        }
        return ownerAdapted;
    }


    async savePost (newPost: PostDto): Promise<void>
    {          
        const foundOwner = await this.connection.user.findFirst({
            where: { id: newPost.ownerId }
        });        
        if (!foundOwner)
        {
            throw new ApiError(404, "Post owner not exists!");
        }
        const postAdapted = PostgresPostsAdapter.toDatabase(newPost);        
        await this.connection.post.create({
            data: postAdapted
        })
    }


    async updatePost(id: string, newPostData: DynamicPostDto): Promise<void> 
    {
        const postInput = PostgresPostsAdapter.toDatabase(newPostData);
        await this.connection.post.update({
            where: { id },
            data: postInput
        });
    }


    async deletePost (id: string): Promise<void> 
    {
        await this.connection.post.delete({
            where: { id }
        });   
    }

}