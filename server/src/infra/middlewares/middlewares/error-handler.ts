import { NextFunction, Request, Response } from "express";
import { IHTTPServer } from "../../server-http/server-http-contract";
import { ApiError } from "../../../domain/errors/api-error";
import { IMiddleware } from "../i-middleware";

export default class ErrorHandler implements IMiddleware
{
    constructor (
        private httpServer: IHTTPServer
    ){}

    initMiddleware()
    {
        this.httpServer.middleware((error: any, req: Request, res: Response, next: NextFunction) => 
        {
            return (error instanceof ApiError)?
                res.status(error.statusCode).json({ message: error.message })
            :
                res.status(500).json({ message: "Server error!"});
        })
    }
}