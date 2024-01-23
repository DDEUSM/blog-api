import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "./infra/repositories/repository-implementations/posts-repository"
import { Router } from "./infra/router/router";
import { ExpressAdapter } from "./infra/server-http/express-adapter";
import { UsersRepository } from "./infra/repositories/repository-implementations/users-repository";
import env from "./env";
import ErrorHandler from "./infra/middlewares/middlewares/error-handler";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";

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
httpServer.setSwagger("/api-docs", swaggerUi.serve, swaggerUi.setup, swaggerDocs);

httpServer.listen(Number(env.PORT));

