import jwt from "jsonwebtoken";
import env from "../env";
import { randomUUID } from "crypto";

export function tokenForTest()
{
    const newToken = jwt.sign (
        { id: randomUUID() }, 
        env.ACCESS_TOKEN_SECRET,
        { "expiresIn": "1d" }
    );
    return newToken;
}