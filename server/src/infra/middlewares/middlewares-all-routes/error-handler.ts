import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../domain/errors/api-error";

export default class ErrorHandler
{
    public static middleware (): Function
    {
        return (error: any, req: Request, res: Response, next: NextFunction) => 
        {
            return (error instanceof ApiError)?
                res.status(error.statusCode).json({ message: error.message })
            :
                res.status(500).json({ message: "Server error!"});
        }
    }
}