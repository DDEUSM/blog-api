import { UserLogin } from "../../../application/use-cases/auth-use-cases/user-login";
import { IUsersRepository } from "../../repositories/repository-contracts/iusers-repository";
import { IHTTPServer } from "../../server-http/server-http-contract";

export default class AuthRoutes
{   
    private usersRepository: IUsersRepository;

    constructor (
        private httpServer: IHTTPServer,
        repositories: any
    ) {
        this.usersRepository = repositories["usersRepository"];
    }

    initRoutes (): void
    {
        this.httpServer.onValidator("post","/login", {
            email: { type: "email", required: true },
            password: { type: "string", required: true }
        },
        async (body: { email: string, password: string }, params: any) => 
        {            
            const userLogin = new UserLogin(this.usersRepository);
            const tokens = await userLogin.execute(body);
            return {
                statusCode: 200,
                data: tokens                
            }
        });

        this.httpServer.on("get","/refresh-token",
        async (body:any, params: any) => 
        {            
            const userLogin = new UserLogin(this.usersRepository);
            const tokens = await userLogin.execute(body);
            return {
                statusCode: 200,
                data: tokens                
            }
        });
    }
}