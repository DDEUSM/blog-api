import axios from "axios";
import { describe, expect, test } from "vitest";
import { PostDto } from "./application/dtos/post-dtos/post-dtos";
import { UserDto } from "./application/dtos/user-dtos/user-dtos";
import { generateString } from "./utils/random";
import { tokenForTest } from "./utils/token-for-test";
import { randomUUID } from "crypto";

describe("All requests should return a correct error statuscode", async () => 
{
    const url = "http://localhost:4550";

    let accessToken;    
    let invalidAccessToken = tokenForTest();

    let configHeaders;

    const user = new UserDto ({
        firstName: "David",
        lastName: "de Deus Mesquita",
        email: "daviddeusm@live.com",
        password: generateString(20),
        id: randomUUID()
    });
    
    const newPost = new PostDto ({
        ownerId: randomUUID(),
        content: "gfjgfn",
        title: "fdgfg",
        id: randomUUID()
    });

    test("user has exists", async () => 
    {
        await axios.post(
            url+"/create-user",
            user
        );

        const error: any = await axios.post(
            url+"/create-user", 
            user
        )
        .catch(error => error);

        expect(error.response.status).toBe(422);

        const authResponse: any = await axios.post(
            url+"/login",
            { email: user.email, password: user.password }
        ).catch(error => console.log(error.response));

        accessToken = authResponse.data.accessToken;

        configHeaders = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }
    });

    
    test("user not exists", async () => 
    {
        const error: any = await axios.post(
            url+"/users", 
            { email: generateString(20)+"@live.com" }
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);
    });


    test("Post owner not exists", async () => 
    {        
        const error: any = await axios.post(
            url+"/create-post",
            newPost,
            configHeaders
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);        
    });    

    test("Post not exists", async () => 
    {
        const postForTest = new PostDto ({
            ownerId: randomUUID(),
            content: "gfjgfn",
            title: "fdgfg"
        });

        const error: any = await axios.post(
            url+"/posts",
            postForTest            
        ).catch(error => error);

        expect(error.response.status).toBe(404);        
    });

    test ("Trying Update an user wich not exists", async () => 
    {  
        const testPost = {
            firstName: "dfdfdsd ds",
            lastName: "dfdfdf",
            email: "hello@gmail.com",
        }

        const error: any = await axios.put(
            url+"/update-user/11000",
            testPost,
            configHeaders
        ).catch(error => error);

        expect(error.response.status).toBe(404);
    });


    test("Illegal arguments", async () => 
    {
        const error: any = await axios.post(
            url+"/posts",
            { ownerId: user.id, new_content: "gfgff" },            
        )
        .catch(error => error);
        
        expect(error.response.status).toBe(400);                        

        await axios.delete(
            url+"/delete-user/"+user.id,
            configHeaders
        ).catch(error => console.log(error.response));
    });

    test ("Jwt not authorized", async () => 
    {
        const error = await axios.delete(
            url+"/delete-user/"+randomUUID,
            {
                headers : {
                    Authorization: "Bearer "+invalidAccessToken
                }
            }
        ).catch(error => error);

        expect(error.response.status).toBe(403);
    });

    test ("route not found", async () => 
    {
        const error: any = await axios.get(url+"/dsdsds")
        .catch(error => error);

        expect(error.response.status).toBe(404);
    })
    
});