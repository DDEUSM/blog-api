export interface IHTTPServer {
    on (httpMethod: string, uri: string, controller: IController): void;
    middleware (middlwareFn: Function): void;
    listen (port: number): void;
};


export type IController = (body: any, params: any) => any;