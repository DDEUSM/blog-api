import path from "path";
import { IHTTPServer } from "../server-http/server-http-contract";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";
import { IMiddleware } from "./i-middleware";

export class MiddlewareManager
{
    constructor (
        private httpServer: IHTTPServer
    ){}

    initAllMiddlewares()
    {
        const dirPath = path.dirname(fileURLToPath(import.meta.url));
        const middlewareFiles = readdirSync(`${path.normalize(dirPath)}/middlewares`);

        middlewareFiles.map(async fileName => 
        {
            const middleware: IMiddleware = new (await import(`./middlewares/${fileName}`))
            .default(this.httpServer);

            middleware.initMiddleware();
        });
    }
}