import { PrismaClient } from "@prisma/client";
import { PostApplicationDto, PostDatabaseDto, PostInputDto } from "../../../application/dtos/post-dtos/post-dtos"
import { IPostsRepository } from "../repository-contracts/iposts-repository";
import { ApiError } from "../../../domain/errors/api-error";


export class PostsRepository implements IPostsRepository
{
    constructor (
        private connection: PrismaClient
    ){}
    
    async find (postsParams: any): Promise<PostApplicationDto[]>
    {   
        const postInput = new PostInputDto ({
            owner_id: postsParams.ownerId,
            title: postsParams.title,
            content: postsParams.content,
            id: postsParams.id,
            date: postsParams.date
        });

        console.log(postInput.getValues());
        
        const posts = await this.connection.post.findMany({
            where: postInput.getValues()
        });

        if (!posts.length)
        {            
            throw new ApiError(404, "Posts not be found!");
        }

        const postsAdapted = posts.map(post => (
            new PostApplicationDto ({
                ownerId: post.owner_id,
                title: post.title,
                content: post.content,
                id: post.id,
                date: post.date
            })
        ));
        
        return postsAdapted;
    }

    
    async findById (id: number): Promise<PostApplicationDto>
    {
        const singlePost = await this.connection.post.findUnique({
            where: { id }
        });

        if (!singlePost)
        {
            throw new ApiError(404, "Post not be found!");
        }
        
        const postAdapted = new PostApplicationDto ({
            ownerId: singlePost.owner_id,
            title: singlePost.title,
            content: singlePost.content,
            id: singlePost.id,
            date: singlePost.date
        });
    
        return postAdapted;
    }


    async savePost (newPost: PostApplicationDto): Promise<void>
    {        
        const ownerExists = await this.connection.user.findFirst({
            where: { id: newPost.ownerId }
        });
        
        if (!ownerExists)
        {
            throw new ApiError(404, "Post owner not exists!");
        }

        const postAdapted = new PostDatabaseDto ({
            owner_id: newPost.ownerId,
            title: newPost.title,
            content: newPost.content,
            id: newPost.id,
            date: newPost.date              
        });

        await this.connection.post.create({
            data: postAdapted.getValues()
        })
    }

}