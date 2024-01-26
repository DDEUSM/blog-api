import { env } from "process";
import { ApiError } from "../../../domain/errors/api-error";
import { IUsersRepository } from "../../repositories/repository-contracts/iusers-repository";
import jwt from "jsonwebtoken";
import { IPostsRepository } from "../../repositories/repository-contracts/iposts-repository";

export default class VerifyAuthorization
{       
    
    constructor (
        private usersRepository: IUsersRepository,
        private postsRepository: IPostsRepository
    ){}

    private verifyJwt (req: any, output: any): OutputType
    { 
        const error = new ApiError(401, "token is empty");
        let response: OutputType;
        const authHeader = req.headers["authorization"];
        if (!authHeader)
        {
            return { error, output: null }
        }
        const token = authHeader.split(" ")[1];        
        jwt.verify(
            token, 
            env.ACCESS_TOKEN_SECRET,
            (err: any, decoded) => {
                if (err)
                {
                    output.id = null;
                }
                output.id = decoded.id         
            }                
        ); 
        return output.id? { error: null, output }: {error, output}
    }


    async userRoutes ( id: string ): Promise<OutputType>
    {
        const error = new ApiError(401, "");
        const foundUser = await this.usersRepository.findUserById(id)
        .catch(error => {});
        if (!foundUser)
        {
            return { error, match: false }
        }        
        if (!(id === foundUser.id))
        {
            return { error, match: false }
        }
        return { error: null, match: true }
    }


    async postRoutes ( id: string ): Promise<OutputType>
    {
        const error = new ApiError(401, "");
        const foundUser = await this.postsRepository.findAuthorByPostId(id)
        .catch(() => {});
        if (!foundUser)
        {
            return { error, match: false };
        }
        if (!(id === foundUser.id))
        {
            return { error, match: false }
        }
        return { error: null, match: true }
    }


    middleware (verify?: "postRoutes" | "userRoutes"): Function
    {                
        return async (req: any, res: any, next: any) => 
        {   
            const { error, output } = this.verifyJwt(req, {});
            if (error)
            {
                return next(error);
            }            
            if (verify)
            {
                const { id } = req.params;
                const { error, match } = await this[verify](id);
                if (error)
                {
                    return next(error);
                }
                return next();
            }         
            next();
        }
    }
}

type OutputType = {error: ApiError | null, [key: string]: any };
