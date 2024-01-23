import { IHTTPServer } from "../../server-http/server-http-contract";

export default class DocumentMiddleware
{
    constructor (
        private httpServer: IHTTPServer
    ){}

    public static middleware (): Function
    {
        return () => {}
    }
}