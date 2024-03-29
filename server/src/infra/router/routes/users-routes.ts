import { DynamicUserDto, UserDto } from "../../../application/dtos/user-dtos/user-dtos";
import { CreateUser } from "../../../application/use-cases/users-use-cases/create-user/create-user";
import { DeleteUser } from "../../../application/use-cases/users-use-cases/delete-user/delete-user";
import { GetUserByEmail } from "../../../application/use-cases/users-use-cases/get-user-by-email/get-user-by-email";
import { GetUserById } from "../../../application/use-cases/users-use-cases/get-user-by-id/get-user-by-id";
import { GetUsers } from "../../../application/use-cases/users-use-cases/get-users/get-users";
import { UpdateUser } from "../../../application/use-cases/users-use-cases/update-user/update-user";
import { verifyAuthorization } from "../../../main";
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
        this.httpServer.onValidator("get", "/users", {
            dataSchema: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "email" },            
                id: { type: "uuidv4" }
            },
            from: "query"
        }, async (body: DynamicUserDto, params: any, query: any, cookies: any) => {            
            const getUsers = new GetUsers ( this.usersRepository );
            const users = await getUsers.execute(query);
            return {
                statusCode: 200,
                data: users
            }
        });


        this.httpServer.on("get", "/users/id/:id", async (body: any, params: any, query: any, cookies: any) => {
            const getUserById = new GetUserById ( this.usersRepository );             
            const user = await getUserById.execute(params.id);
            return {
                statusCode: 200,
                data: user
            }
        });


        this.httpServer.on("get", "/users/email/:email", async (body: any, params: any, query: any, cookies: any) => {
            const getUserByEmail = new GetUserByEmail ( this.usersRepository );
            const user = await getUserByEmail.execute(params.email);
            return {
                statusCode: 200,
                data: user
            }
        });


        this.httpServer.onValidator("post", "/users", {
            dataSchema: {
                firstName: { type: "string", required: true },
                lastName: { type: "string", required: true },
                email: { type: "email", required: true },
                password: { type: "string", required: true },
                refreshToken: { type: "string" },
                id: { type: "uuidv4" }
            },
            from: "body"
        }, async (body: any, params: any, query: any, cookies: any) => {            
            const createUser = new CreateUser ( this.usersRepository );
            await createUser.execute(body);
            return {
                statusCode: 201,
                data: { message: "User has been created." }
            }
        });


        this.httpServer.onValidator("put", "/users/:id", {
            dataSchema: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "email" },                       
            },
            from: "body"
        }, async (body: any, params: any, query: any, cookies: any) => {   
            const updateUser = new UpdateUser(this.usersRepository);
            await updateUser.execute(params.id, body);
            return {
                statusCode: 200,
                data: { message: "User has been up-to-date." }
            }
        }, verifyAuthorization.middleware("userRoutes"))


        this.httpServer.on("delete", "/users/:id", async (body: any, params: any, query: any, cookies: any) => {            
            const deleteUser = new DeleteUser(this.usersRepository);
            await deleteUser.execute(params.id);
            return {
                statusCode: 200,
                data: { message: "User has deleted!" }
            }
        }, verifyAuthorization.middleware("userRoutes"));

    }
}