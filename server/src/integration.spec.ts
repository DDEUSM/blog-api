import { describe, expect, test } from "vitest";
import axios from "axios";
import { UserDto } from "./application/dtos/user-dtos/user-dtos";
import { PostDto } from "./application/dtos/post-dtos/post-dtos";
import { generateString } from "./utils/random";
import bcrypt from  "bcrypt";
import { randomUUID } from "crypto";

const url = "http://localhost:4550";

describe("Happy Routes test", () => 
{
    let accessToken;
    const user = new UserDto ({
        firstName: generateString(10),
        lastName: generateString(20),
        email: generateString(20)+"@live.com",
        password: generateString(20),
        id: randomUUID()
    });

    const newPost = new PostDto ({
        ownerId: user.id,
        title: "MEU POST",
        content: "Meu primeiro post neste blog",
        id: randomUUID()            
    }); 
    

    test("create a new user", async () => 
    {
        const response: any = await axios.post(
            url+"/users", 
            user
        ).catch(error => console.log(error.response.data))

        expect(response.status).toBe(201);
    });

    test ("User authentication", async () => 
    {
        const response = await axios.post(
            url+"/login",
            { email: user.email, password: user.password },
        ).catch(error => { console.log(error.response.data); return error });
        
        console.log(response);
        expect(response.data.accessToken).toBeTruthy();      

        accessToken = response.data.accessToken;

    });

    test ("get the user wich has been created before", async () => 
    {
        const response: any = await axios.get(
            url+"/users", 
            {params: { email: user.email, firstName: user.firstName }}
        ).catch(error => console.log(error.response.data));

        const response2: any = await axios.get(
            url+"/users/id/"+user.id
        ).catch(error => console.log(error.response.data.message));

        const response3: any = await axios.get(
            url+"/users/email/"+user.email
        ).catch(error => console.log(error.response.data));

        expect(response.data[0].email).toBe(user.email);
        expect(response.data[0].firstName).toBe(user.firstName);
        expect(response.data[0].lastName).toBe(user.lastName);      

        const match = await bcrypt.compare(user.password, 
            response.data[0].password)
        
        expect(match).toBe(true);               
        
        expect(response2.data.email).toBe(user.email);
        expect(response2.data.firstName).toBe(user.firstName);
        expect(response2.data.lastName).toBe(user.lastName);

        const match2 = await bcrypt.compare(user.password, 
            response2.data.password)
        
        expect(match2).toBe(true);
                               
        expect(response3.data.email).toBe(user.email);
        expect(response3.data.firstName).toBe(user.firstName);
        expect(response3.data.lastName).toBe(user.lastName);

        const match3 = await bcrypt.compare(user.password, 
            response3.data.password)
        
        expect(match3).toBe(true);
               
    });

    test("Update user firstName and lastname", async () => 
    {       
        const body = { firstName: "David", lastName: "de Deus Mesquita" };
        const configOptions = {
            headers: {                
                Authorization: `Bearer ${accessToken}`
            }             
        };        

        const response1: any = await axios.put(
            url+"/users/"+user.id,
            body,  
            configOptions      
        ).catch(error => {console.log(error.response)});

        expect(response1.status).toBe(200);

        const response: any = await axios.get(
            url+"/users/id/"+user.id,
            configOptions
        ).catch(error => {console.log(error.response)});

        expect(response.data.id).toBe(user.id);
        expect(response.data.firstName).toBe(body.firstName);
        expect(response.data.lastName).toBe(body.lastName);
    });

    test("create a new post", async () => 
    {
        const configOptions = {
            headers: {                
                Authorization: `Bearer ${accessToken}`
            }             
        };

        const response: any = await axios.post(
            url+"/posts",
            newPost,
            configOptions
        ).catch(error => console.log(error.response.data));

        expect(response.status).toBe(201);
    });

    
    test("get the post wich has been created before", async () => 
    {
        const configOptions = {
            headers: {                
                Authorization: `Bearer ${accessToken}`
            }             
        };

        const response: any = await axios.get (
            url+"/posts",
            {params: newPost}
        ).catch(error => console.log(error.response.data));

        const response2: any = await axios.get(
            url+"/posts/"+newPost.id
        ).catch(error => console.log(error.response.data));

        expect(response.status).toBe(200);
        expect(response.data[0].title).toBe(newPost.title);

        expect(response2.status).toBe(200);
        expect(response2.data.title).toBe(newPost.title);        
    });   
    
    test ("update a post", async () => 
    {
        const body = { title: "Título atualizado", content: "Título atualizado com sucesso!"}
        const configOptions = {
            headers: {
                Authorization: "Bearer "+accessToken
            }
        }
        const response = await axios.put(
            url+"/posts/"+newPost.id,
            body,
            configOptions
        )

        expect(response.data.message).toBe("Post has been up-to-date!");
        
        const updatedPost = await axios.get(
            url+"/posts/"+newPost.id
        );

        expect(updatedPost.data.title).toBe(body.title);
        expect(updatedPost.data.content).toBe(body.content);    
        
        const deletePost =  await axios.delete (
            url+"/posts/"+newPost.id,
            configOptions
        ).catch(error => { console.log(error.response.data); return error});

        expect(deletePost.status).toBe(200);

        const deleteUser = await axios.delete (
            url+"/users/"+user.id,
            configOptions
        ).catch(error => { console.log(error.response.data); return error });

        expect(deleteUser.status).toBe(200);

        const error: any = await axios.get(
            url+"/posts/"+newPost.id,
        ).catch(error => {console.log(error.response.data); return error});

        expect(error.response.status).toBe(404);        

        const error2: any = await axios.get(
            url+"/users/id/"+user.id,
            configOptions
        ).catch(error => {console.log(error.response.data); return error});

        expect(error2.response.status).toBe(404);        
    });
    
});

