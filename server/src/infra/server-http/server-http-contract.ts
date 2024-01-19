import { TInputSchema } from "../middlewares/middlewares/validator";

export interface IHTTPServer {
    on (httpMethod: string, uri: string, controller: IController, middleware?: Function): void;
    onCookie (httpMethod: string, uri: string, controller: IController): void;
    onMiddleware (httpMethod: string, uri: string, inputSchema: TInputSchema, controller: IController, middleware?: Function): void;
    middleware (middlwareFn: Function): void;
    listen (port: number): void;
    useNotFound (): void;
};


export type IController = (body: any, params: any) => any;
