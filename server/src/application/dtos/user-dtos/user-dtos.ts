import InputsCleaner from "../../../utils/cleanInputs";

export class UserDto
{
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;    
    readonly passwordHash: string;
    readonly refreshToken?: string;
    readonly id?: string;
    
    constructor ( props: TUserApplicationProps )
    {
        Object.assign(this, props);
    }
}


export class DynamicUserDto 
{
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;             
    readonly id?: string; 

    constructor ( props: TUserInputProps )
    {
        Object.assign(this, props);    
    }
}

