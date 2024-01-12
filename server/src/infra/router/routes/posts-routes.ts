import { GetPostsById } from "../../../application/use-cases/get-post-by-id/get-post-by-id";
import { GetPosts } from "../../../application/use-cases/get-posts/get-posts";
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
        this.httpServer.on("get", "/posts/:id", async (body: any, params: any) => {
            const getPostsById = new GetPostsById(this.postsRepository);
            const response = await getPostsById.execute(Number(params.id));
            return {
                statusCode: 200,
                data: response
            }
        });

        this.httpServer.on("post", "/posts", async (body: any, params: any) => {
            const getPosts = new GetPosts(this.postsRepository);
            const response = await getPosts.execute(body);
            return {
                statusCode: 200,
                data: response
            }
        });
    }
}