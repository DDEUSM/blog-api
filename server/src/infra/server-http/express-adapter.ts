import express, { NextFunction, Request, Response } from "express";
import { IController, IHTTPServer } from "./server-http-contract";

export class ExpressAdapter implements IHTTPServer
{
    private server: any;

    constructor (){
        this.server = express();  
        this.server.use(express.json());
    }

    on(httpMethod: string, uri: string, controller: IController): void 
    {
        this.server[httpMethod](uri, async(req: Request, res: Response, next: NextFunction) => {
            try
            {
                const output = await controller(req.body as any, req.params as any);
                return res.status(output.statusCode).json(output.data);     
            }
            catch (error: any)
            {
                next(error);
            }           
        });        
    }

    middleware(middlewareFn: Function): void
    {        
        this.server.use(middlewareFn);
    }

    listen(port: number): void 
    {
        this.server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
    }
}