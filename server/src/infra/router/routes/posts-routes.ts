import { DynamicPostDto, PostDto } from "../../../application/dtos/post-dtos/post-dtos";
import { CreatePost } from "../../../application/use-cases/posts-use-cases/create-post/create-post";
import { DeletePost } from "../../../application/use-cases/posts-use-cases/delete-post/delete-post";
import { GetPostsById } from "../../../application/use-cases/posts-use-cases/get-post-by-id/get-post-by-id";
import { GetPosts } from "../../../application/use-cases/posts-use-cases/get-posts/get-posts";
import { UpdatePost } from "../../../application/use-cases/posts-use-cases/update-post/update-post";

import { IPostsRepository } from "../../repositories/repository-contracts/iposts-repository";
import { IHTTPServer } from "../../server-http/server-http-contract";

export default class PostsRoutes
{
    private postsRepository: IPostsRepository;

    constructor (
        private httpServer: IHTTPServer,
        repositories: any
    ){
        this.postsRepository = repositories["postsRepository"];
    }

    initRoutes(): void
    {
        this.httpServer.on("get", "/posts/:id", async (body: any, params: any) => 
        {
            const getPostsById = new GetPostsById(this.postsRepository);
            const response = await getPostsById.execute(Number(params.id));
            return {
                statusCode: 200,
                data: response
            }
        });
        

        this.httpServer.onMiddleware("post", "/posts", {
            ownerId: { type: "number" },
            title: { type: "string" },
            content: { type: "string" },
            id: {type: "number" },
            date: { type: "date"}
        },         
        async (body: DynamicPostDto, params: any) => 
        {   
            const getPosts = new GetPosts(this.postsRepository);
            const response = await getPosts.execute(body);
            return {
                statusCode: 200,
                data: response
            }
        });


        this.httpServer.onMiddleware("post", "/create-post", {
            ownerId: { type: "number", required: true },
            title: { type: "string", required: true },
            content: { type: "string", required: true },
            id: {type: "number" },
            date: { type: "date"}
        },
        async (body: PostDto, params: any) => 
        {
            const createPost = new CreatePost( this.postsRepository );
            await createPost.execute(body);
            return {
                statusCode: 201,
                data: { message: "Post has been created!" }
            }
        });


        this.httpServer.onMiddleware("put", "/update-post/:id", {            
            title: { type: "string" },
            content: { type: "string" }            
        }, async (body: any, params: any) => {
            const updatePost = new UpdatePost( this.postsRepository );
            await updatePost.execute(params.id, body);
            return {
                statusCode: 200,
                data: { message: "Post has been up-to-date!" }
            }
        });


        this.httpServer.on("delete", "/delete-post/:id", 
        async (body: any, params: any) => 
        {
            const deletePost = new DeletePost( this.postsRepository );
            await deletePost.execute(Number(params.id));
            return {
                statusCode: 200,
                data: { message: "Post was deleted!" }
            }
        })
    }
}