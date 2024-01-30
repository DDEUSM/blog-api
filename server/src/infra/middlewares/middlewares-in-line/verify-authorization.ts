import { env } from "process";
import { ApiError } from "../../../domain/errors/api-error";
import { IUsersRepository } from "../../repositories/repository-contracts/iusers-repository";
import jwt from "jsonwebtoken";
import { IPostsRepository } from "../../repositories/repository-contracts/iposts-repository";

export default class VerifyAuthorization
{   
    private invalidTokenError = new ApiError(401, "Invalid token");
    private NotAuthorizedError = new ApiError(403, "Not authorized");
    
    constructor (
        private usersRepository: IUsersRepository,
        private postsRepository: IPostsRepository
    ){}

    private verifyJwt (req: any, output: any): OutputType
    {                 
        const authHeader = req.headers["authorization"];
        if (!authHeader)
        {
            return { error: this.invalidTokenError, output: null }
        }
        const token = authHeader.split(" ")[1];        
        if (!token)
        {
            return { error: this.invalidTokenError, output: null }
        }
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
        return output.id? { error: null, output }: {error: this.invalidTokenError, output}
    }


    async userRoutes ( id: string ): Promise<OutputType>
    {        
        const foundUser = await this.usersRepository.findUserById(id)
        .catch(error => {});
        if (!foundUser)
        {
            return { error: this.NotAuthorizedError, match: false }
        }        
        if (!(id === foundUser.id))
        {
            return { error: this.NotAuthorizedError, match: false }
        }
        return { error: null, match: true }
    }


    async postRoutes ( id: string ): Promise<OutputType>
    {        
        const foundUser = await this.postsRepository.findAuthorByPostId(id)
        .catch(() => {});
        if (!foundUser)
        {
            return { error: this.NotAuthorizedError, match: false };
        }
        if (!(id === foundUser.id))
        {
            return { error: this.NotAuthorizedError, match: false }
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
                res.status(error.statusCode).json(error.message);
                return;
            }            
            if (verify)
            {
                const { id } = req.params;
                const { error, match } = await this[verify](id);
                if (error)
                {
                    res.status(error.statusCode).json(error.message);
                    return;
                }                
            }         
            next();
        }
    }
}

type OutputType = {error: ApiError | null, [key: string]: any };
