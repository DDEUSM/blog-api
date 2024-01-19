import { IHTTPServer } from "../../server-http/server-http-contract";
import jwt from "jsonwebtoken";
import env from "../../../env";
import { ApiError } from "../../../domain/errors/api-error";
import { NextFunction } from "express";

export default class VerifyJwt
{
    public static middleware (): Function
    {
        return (req: any, res: any, next: any) => 
        {
            const authHeader = req.headers["authorization"];

            if (!authHeader)
            {
                throw new ApiError(401, "token is empty");
            }

            const token = authHeader.split(" ")[1];

            jwt.verify(
                token, 
                env.ACCESS_TOKEN_SECRET,
                (error: any, decoded) => {
                    if (error)
                    {
                        throw new ApiError(401, "Invalid token!");
                    }
                    req.email = decoded.email;
                    next();
                }                
            );                        
        }
    }
}