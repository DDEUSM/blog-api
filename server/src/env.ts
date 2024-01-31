import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const PORT = process.env.PORT? Number(process.env.PORT) : 4550;

export default {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    PORT
}