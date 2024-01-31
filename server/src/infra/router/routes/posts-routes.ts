import { DynamicPostDto, PostDto } from "../../../application/dtos/post-dtos/post-dtos";
import { CreatePost } from "../../../application/use-cases/posts-use-cases/create-post/create-post";
import { DeletePost } from "../../../application/use-cases/posts-use-cases/delete-post/delete-post";
import { GetPostsById } from "../../../application/use-cases/posts-use-cases/get-post-by-id/get-post-by-id";
import { GetPosts } from "../../../application/use-cases/posts-use-cases/get-posts/get-posts";
import { UpdatePost } from "../../../application/use-cases/posts-use-cases/update-post/update-post";
import { verifyAuthorization } from "../../../main";

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
        this.httpServer.on("get", "/posts/:id", 
        async (body: any, params: any, query: any, cookies: any) => 
        {
            const getPostsById = new GetPostsById(this.postsRepository);
            const response = await getPostsById.execute(params.id);
            return {
                statusCode: 200,
                data: response
            }
        });
        

        this.httpServer.onValidator("get", "/posts", {
            dataSchema: {
                ownerId: { type: "uuidv4" },
                title: { type: "string" },
                content: { type: "string" },
                id: {type: "uuidv4" },
                date: { type: "date"}
            },
            from: "query"
        },         
        async (body: DynamicPostDto, params: any, query: any, cookies: any) => 
        {   
            const getPosts = new GetPosts(this.postsRepository);
            const response = await getPosts.execute(query);
            return {
                statusCode: 200,
                data: response
            }
        });


        this.httpServer.onValidator("post", "/posts", {
            dataSchema: {
                ownerId: { type: "uuidv4", required: true },
                title: { type: "string", required: true },
                content: { type: "string", required: true },
                id: {type: "uuidv4", required: true },
                date: { type: "date"}
            },
            from: "body"
        },
        async (body: PostDto, params: any, query: any, cookies: any) => 
        {
            const createPost = new CreatePost( this.postsRepository );
            await createPost.execute(body);
            return {
                statusCode: 201,
                data: { message: "Post has been created!" }
            }
        }, verifyAuthorization.middleware());


        this.httpServer.onValidator("put", "/posts/:id", {
            dataSchema: {            
                title: { type: "string" },
                content: { type: "string" }            
            },
            from: "body"
        }, async (body: any, params: any, query: any, cookies: any) => {
            const updatePost = new UpdatePost( this.postsRepository );
            await updatePost.execute(params.id, body);
            return {
                statusCode: 200,
                data: { message: "Post has been up-to-date!" }
            }
        }, verifyAuthorization.middleware("postRoutes"));


        this.httpServer.on("delete", "/posts/:id", 
        async (body: any, params: any, query: any, cookies: any) => 
        {
            const deletePost = new DeletePost( this.postsRepository );
            await deletePost.execute(params.id);
            return {
                statusCode: 200,
                data: { message: "Post was deleted!" }
            }
        }, verifyAuthorization.middleware("postRoutes"))
    }
}