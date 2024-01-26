import jwt from "jsonwebtoken";
import env from "../env";

export function tokenForTest()
{
    const newToken = jwt.sign (
        { email: "jwt@test.com" }, 
        env.ACCESS_TOKEN_SECRET,
        { "expiresIn": "1d" }
    );
    return newToken;
}