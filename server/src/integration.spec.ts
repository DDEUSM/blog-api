import { describe, expect, test } from "vitest";
import crypto from "crypto";
import axios from "axios";
import { UserApplicationDto } from "./application/dtos/user-dtos/user-dtos";
import { PostApplicationDto } from "./application/dtos/post-dtos/post-dtos";


const url = "http://localhost:4550";

const generateString = (bytesNum: number) => 
{
    return crypto.randomBytes(bytesNum).toString("hex");
}

const generateRandomNumber = () =>
{
    return Math.floor((Math.random() * 1000) + Math.random() * 10);
}


describe("Happy Routes test", () => 
{

    const user = new UserApplicationDto ({
        firstName: generateString(10),
        lastName: generateString(20),
        email: generateString(20),
        gender: "male"
    });

    let newPost;

    test("create a new user", async () => 
    {
        const response: any = await axios.post(
            url+"/create-user", 
            user
        )
        .catch(error => console.log(error))

        expect(response.status).toBe(201);

    });

    test("get the user wich has been created before", async () => 
    {
        const response: any = await axios.post(
            url+"/users", 
            { email: user.email, firstName: user.firstName }
        )
        .catch(error => console.log(error));

        expect(response.data[0].email).toBe(user.email);
        expect(response.data[0].firstName).toBe(user.firstName);
        expect(response.data[0].lastName).toBe(user.lastName);
        expect(response.data[0].gender).toBe(user.gender);

        newPost = new PostApplicationDto ({
            ownerId: response.data[0].id,
            title: "MEU POST",
            content: "Meu primeiro post neste blog"
        });            
    })

    test("create a new post", async () => 
    {
        const response: any = await axios.post(
            url+"/create-post",
            newPost
        )
        .catch(error => console.log(error))

        expect(response.status).toBe(201);
    });

    test("get the post wich has been created before", async () => 
    {
        const response = await axios.post (
            url+"/posts",
            newPost
        )

        expect(response.status).toBe(200);
        expect(response.data[0].title).toBe(newPost.title);
    });
});

describe("All requests should return a correct error statuscode", () => 
{

    const user = new UserApplicationDto ({
        firstName: "David",
        lastName: "de Deus Mesquita",
        email: "daviddeusm@live.com",
        gender: "male"
    });        


    test("user has exists", async () => 
    {
        const error: any = await axios.post(
            url+"/create-user", 
            user
        )
        .catch(error => error);

        expect(error.response.status).toBe(400);
    });

    
    test("user not exists", async () => 
    {
        const error: any = await axios.post(
            url+"/users", 
            { email: generateString(20) }
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);
    });


    test("Post owner not exists", async () => 
    {
        const newPost = new PostApplicationDto ({
            ownerId: 3437463,
            content: "gfjgfn",
            title: "fdgfg"
        });

        const error: any = await axios.post(
            url+"/create-post",
            newPost
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);        
    });


    test("Post not exists", async () => 
    {
        const newPost = new PostApplicationDto ({
            ownerId: 3437463,
            content: "gfjgfn",
            title: "fdgfg"
        });

        const error: any = await axios.post(
            url+"/posts",
            newPost
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);        
    });


    test("Illegal arguments", async () => 
    {
        const error: any = await axios.post(
            url+"/posts",
            { owner_id: 35545, new_content: "gfgff" }
        )
        .catch(error => error);
        
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('json has illegal keys');        
        
    })
});