import express, { NextFunction, Request, Response} from "express";
import { IController, IHTTPServer } from "./server-http-contract";
import { TInputSchema, Validator } from "../../utils/validator";

export class ExpressAdapter implements IHTTPServer
{
    private server: any;    

    constructor (){
        this.server = express();  
        this.server.use(express.json()); 
    }

    on (httpMethod: string, uri: string, controller: IController, middleware?: Function): void 
    {
        const params = [uri, middleware].filter(param => param);     

        this.server[httpMethod](...params, async(req: Request, res: Response, next: NextFunction) => {
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


    onMiddleware (httpMethod: string, uri: string, inputSchema: TInputSchema, controller: IController): void 
    {
        const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => 
        {
            Validator.validateInputs(req, res, next,inputSchema);
        }
        
        this.server[httpMethod](uri, validatorMiddleware, async(req: Request, res: Response, next: NextFunction) => {
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

    onCookie(httpMethod: string, uri: string, controller: IController): void 
    {
        this.server[httpMethod](uri, async(req: Request, res: Response, next: NextFunction) => {
            try
            {
                const output = await controller(req.body as any, req.params as any);

                return res.cookie("jwt", output.refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                .status(output.statusCode).json(output.data);     
            }
            catch (error: any)
            {
                next(error);
            }           
        });        
    }

    middleware (middlewareFn: Function): void
    {        
        this.server.use(middlewareFn);
    }

    useNotFound(): void {
        this.server.use("*", (req: Request, res: Response) => 
        {
            res.status(404).json({ message: "Resource Not found!" });
        })
    }

    listen (port: number): void 
    {        
        this.server.listen(port, () => console.log(`Server running at http://localhost:${port}`));

    }

}