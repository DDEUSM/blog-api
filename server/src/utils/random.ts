import crypto from "crypto";

export const generateString = (bytesNum: number) => 
{
    return crypto.randomBytes(bytesNum).toString("hex");
}

export const generateRandomNumber = () =>
{
    return Math.floor((Math.random() * 1000) + Math.random() * 10);
}
