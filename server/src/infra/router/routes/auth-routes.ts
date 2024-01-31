import { RefreshToken } from "../../../application/use-cases/auth-use-cases/refresh-token";
import { UserLogin } from "../../../application/use-cases/auth-use-cases/user-login";
import { ApiError } from "../../../domain/errors/api-error";
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
            dataSchema: {
                email: { type: "email", required: true },
                password: { type: "string", required: true }
            },
            from: "body"
        }, async (body: {email: string, password: string}, params: any, cookies: any) => 
        {            
            const userLogin = new UserLogin(this.usersRepository);
            const tokens = await userLogin.execute(body);
            return {
                statusCode: 200,
                data: { accessToken: tokens.accessToken },
                toCookie: tokens.refreshToken                
            }
        });

        this.httpServer.on("get","/refresh-token",
        async (body: any, params: any, cookies: any) => 
        {  
            console.log(cookies?.jwt);
            if (!cookies?.jwt)        
            {
                throw new ApiError(400, "Refresh Token is empty")
            }
            const refreshToken = new RefreshToken(this.usersRepository);
            const newAccessToken = await refreshToken.execute(cookies.jwt);
            return {
                statusCode: 200,
                data: { newAccessToken: newAccessToken }               
            }
        });
    }
}