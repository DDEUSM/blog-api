export class User
{
    constructor (        
        readonly firstName: string,
        readonly lastName: string,
        readonly email: string,
        readonly gender: string,
        readonly id?: number,
    ){}
}