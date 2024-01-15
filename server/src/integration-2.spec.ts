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


describe("Unique Keys Methods - Happy Routes test", () => 
{

    const user = new UserApplicationDto ({
        firstName: generateString(10),
        lastName: generateString(20),
        email: generateString(20),
        gender: "male",
        id: generateRandomNumber()
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

    
    test("get the user wich has been created before by id", async () => 
    {
        const response: any = await axios.get(
            url+"/users/id/"+user.id            
        )
        .catch(error => console.log(error));
        
        expect(response.data.id).toBe(user.id);
        expect(response.data.email).toBe(user.email);
        expect(response.data.firstName).toBe(user.firstName);
        expect(response.data.lastName).toBe(user.lastName);
        expect(response.data.gender).toBe(user.gender);

        newPost = new PostApplicationDto ({
            ownerId: response.data.id,
            title: "MEU POST",
            content: "Meu primeiro post neste blog",
            id: generateRandomNumber()
        });            
    })
    

    test("get the user wich has been created before by email", async () => 
    { 
        const response2: any = await axios.get(
            url+"/users/email/"+user.email            
        )
        .catch(error => console.log(error));
        
        expect(response2.data.email).toBe(user.email);
        expect(response2.data.firstName).toBe(user.firstName);
        expect(response2.data.lastName).toBe(user.lastName);
        expect(response2.data.gender).toBe(user.gender);
        
        newPost = new PostApplicationDto ({
            ownerId:response2.data.id,
            content: "MEU POST",
            title: "Meu primeiro post neste blog",
            id: generateRandomNumber()
        });
    });


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
        const response = await axios.get (
            url+"/posts/"+newPost.id
        );

        expect(response.status).toBe(200);
        expect(response.data.title).toBe(newPost.title);
    });
    
});

describe("Unique Keys Methods - All requests should return a correct error statuscode", () => 
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

    
    test("user not exists - find by id", async () => 
    {
        const error: any = await axios.get(
            url+"/users/id/2888999",            
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);
    });

    test("user not exists - find by email", async () => 
    {
        const error: any = await axios.get(
            url+"/users/email/hghthth@ff",            
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);
    });

    test("Post owner not exists", async () => 
    {
        const newPost = new PostApplicationDto ({
            ownerId: 111000,
            title: generateString(10),
            content: generateString(10)
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

        const error: any = await axios.get(
            url+"/posts/47777"
        )
        .catch(error => error);

        expect(error.response.status).toBe(404);        
    });
});