export class ApiError implements Error
{   
    name: string;
    constructor (
        public statusCode: number,
        public message: string
    ){}
}