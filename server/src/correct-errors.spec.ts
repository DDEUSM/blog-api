import axios from "axios";
import { describe, expect, test } from "vitest";
import { PostDto } from "./application/dtos/post-dtos/post-dtos";
import { UserDto } from "./application/dtos/user-dtos/user-dtos";
import { generateString } from "./utils/random";

describe("All requests should return a correct error statuscode", async () => 
{
    const url = "http://localhost:4550";

    const user = new UserDto ({
        firstName: "David",
        lastName: "de Deus Mesquita",
        email: "daviddeusm@live.com",
        passwordHash: generateString(20),
        id: 200
    });
    
    const newPost = new PostDto ({
        ownerId: 3437463,
        content: "gfjgfn",
        title: "fdgfg"
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
        .catch(error => {console.log(error.response.data); return error});

        expect(error.response.status).toBe(422);
    });

    
    test("user not exists", async () => 
    {
        const error: any = await axios.post(
            url+"/users", 
            { email: generateString(20)+"@live.com" }
        )
        .catch(error => {console.log(error.response.data); return error});

        expect(error.response.status).toBe(404);
    });


    test("Post owner not exists", async () => 
    {        
        const error: any = await axios.post(
            url+"/create-post",
            newPost
        )
        .catch(error => {console.log(error.response.data); return error});

        expect(error.response.status).toBe(404);        
    });


    test("Post not exists", async () => 
    {
        const newPost = new PostDto ({
            ownerId: 3437463,
            content: "gfjgfn",
            title: "fdgfg"
        });

        const error: any = await axios.post(
            url+"/posts",
            newPost
        )
        .catch(error => {console.log(error.response.data); return error});

        expect(error.response.status).toBe(404);        
    });


    test("Illegal arguments", async () => 
    {
        const error: any = await axios.post(
            url+"/posts",
            { ownerId: 35545, new_content: "gfgff" }
        )
        .catch(error => {console.log(error.response.data); return error});
        
        expect(error.response.status).toBe(400);        ;                
        await axios.delete(
            url+"/delete-user/"+user.id
        );
    });

    test ("route not found", async () => 
    {
        const error: any = await axios.get(url+"/dsdsds")
        .catch(error => { console.log(error.response.data); return error});

        expect(error.response.status).toBe(404);
    })
    
});