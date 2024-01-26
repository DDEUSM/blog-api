import { TInputSchema } from "../middlewares/middlewares-in-line/validator";

export interface IHTTPServer {
    on (httpMethod: HttpMethodType, uri: string, controller: IController, middleware?: Function): void;
    onCookie (httpMethod: HttpMethodType, uri: string, controller: IController): void;
    onValidator (httpMethod: HttpMethodType, uri: string, inputSchema: TInputSchema, controller: IController, middleware?: Function): void;
    middleware (middlwareFn: Function, uri?: string): void;
    listen (port: number): void;
    useNotFound (): void;
};

export type HttpMethodType = "get" | "post" | "put" | "delete";

export type IController = (body: any, params: any) => any;