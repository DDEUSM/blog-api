import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "./infra/repositories/repository-implementations/posts-repository"
import { Router } from "./infra/router/router";
import { ExpressAdapter } from "./infra/server-http/express-adapter";
import { UsersRepository } from "./infra/repositories/repository-implementations/users-repository";
import env from "./env";
import ErrorHandler from "./infra/middlewares/middlewares/error-handler";

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

httpServer.middleware(ErrorHandler.middleware());

httpServer.listen(Number(env.PORT));

