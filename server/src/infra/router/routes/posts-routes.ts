import { CreatePost } from "../../../application/use-cases/posts-use-cases/create-post/create-post";
import { GetPostsById } from "../../../application/use-cases/posts-use-cases/get-post-by-id/get-post-by-id";
import { GetPosts } from "../../../application/use-cases/posts-use-cases/get-posts/get-posts";
import { ApiError } from "../../../domain/errors/api-error";
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

        this.httpServer.on("post", "/posts", async (body: TPostInput, params: any) => 
        {   
            const allowedKeys = ["ownerId", "title", "content", "id", "date"];

            const inputKeys = Object.keys(body);

            if(!inputKeys.length)
            {
                throw new ApiError(400, "Request body is empty");
            }

            Object.keys(body).map(key => {
                if (!allowedKeys.includes(key))
                {
                    throw new ApiError(400, "json has illegal keys");                    
                }            
            });

            const getPosts = new GetPosts(this.postsRepository);
            const response = await getPosts.execute(body);
            return {
                statusCode: 200,
                data: response
            }
        });

        this.httpServer.on("post", "/create-post", async (body: any, params: any) => 
        {
            const createPost = new CreatePost( this.postsRepository );

            await createPost.execute(body);

            return {
                statusCode: 201,
                data: { message: "Post has been created!" }
            }
        });
    }
}