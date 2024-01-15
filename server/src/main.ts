import { PrismaClient } from "@prisma/client";
import { config } from "../../node_modules/dotenv/lib/main";
import { MiddlewareManager } from "./infra/middlewares/middleware-manager";
import { PostsRepository } from "./infra/repositories/repository-implementations/posts-repository"
import { Router } from "./infra/router/router";
import { ExpressAdapter } from "./infra/server-http/express-adapter";
import { UsersRepository } from "./infra/repositories/repository-implementations/users-repository";

config();

const prismaConnection = new PrismaClient();

const postsRepository = new PostsRepository(prismaConnection);
const usersRepository = new UsersRepository(prismaConnection);

const repositories = {
    postsRepository,
    usersRepository 
}

const httpServer = new ExpressAdapter();

const router = new Router(repositories, httpServer);
router.initAllRoutes();

const middlewareManager = new MiddlewareManager(httpServer);
middlewareManager.initAllMiddlewares();

httpServer.listen(Number(process.env.PORT));

