import { CreateUser } from "../../../application/use-cases/users-use-cases/create-user/create-user";
import { GetUserByEmail } from "../../../application/use-cases/users-use-cases/get-user-by-email/get-user-by-email";
import { GetUserById } from "../../../application/use-cases/users-use-cases/get-user-by-id/get-user-by-id";
import { GetUsers } from "../../../application/use-cases/users-use-cases/get-users/get-users";
import { IUsersRepository } from "../../repositories/repository-contracts/iusers-repository";
import { IHTTPServer } from "../../server-http/server-http-contract";

export default class UserRoutes
{
    private usersRepository: IUsersRepository;

    constructor (
        private httpServer: IHTTPServer,
        repositories: any
    ){
        this.usersRepository = repositories["usersRepository"];
    }

    initRoutes (): void
    {
        this.httpServer.on("post", "/users", async (body: any, params: any) => 
        {
            const getUsers = new GetUsers ( this.usersRepository );

            const users = await getUsers.execute(body);

            return {
                statusCode: 200,
                data: users
            }
        });


        this.httpServer.on("get", "/users/id/:id", async (body: any, params: any) => 
        {
            const getUserById = new GetUserById ( this.usersRepository );

            const user = await getUserById.execute(Number(params.id));

            return {
                statusCode: 200,
                data: user
            }
        });


        this.httpServer.on("get", "/users/email/:email", async (body: any, params: any) => 
        {
            const getUserByEmail = new GetUserByEmail ( this.usersRepository );

            const user = await getUserByEmail.execute(params.email);

            return {
                statusCode: 200,
                data: user
            }
        });


        this.httpServer.on("post", "/create-user", async (body: any, params: any) => 
        {
            const createUser = new CreateUser ( this.usersRepository );

            await createUser.execute(body);

            return {
                statusCode: 201,
                data: { message: "User has been created." }
            }
        });

    }
}