import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "./infra/repositories/repository-implementations/posts-repository"
import { Router } from "./infra/router/router";
import { ExpressAdapter } from "./infra/server-http/express-adapter";
import { UsersRepository } from "./infra/repositories/repository-implementations/users-repository";
import env from "./env";
import ErrorHandler from "./infra/middlewares/middlewares-all-routes/error-handler";
import swaggerUi from "swagger-ui-express";
import VerifyAuthorization from "./infra/middlewares/middlewares-in-line/verify-authorization";
import { requireModule } from "./utils/requireModule";
const swaggerDocs = requireModule("../../swagger.json");

const prismaConnection = new PrismaClient();
const postsRepository = new PostsRepository(prismaConnection);
const usersRepository = new UsersRepository(prismaConnection);

const repositories = {
    postsRepository,
    usersRepository 
}

export const verifyAuthorization = new VerifyAuthorization (
    usersRepository,
    postsRepository
);

const httpServer = new ExpressAdapter();

const router = new Router(repositories, httpServer);
router.initAllRoutes();

httpServer.middleware(ErrorHandler.middleware());
httpServer.setSwagger("/api-docs", swaggerUi.serve, swaggerUi.setup, swaggerDocs);

httpServer.listen(env.PORT);

