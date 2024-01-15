import InputsCleaner from "../../../utils/cleanInputs";

export class UserApplicationDto
{
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly gender: string;    
    readonly id?: number;

    constructor ( props: TUserApplicationProps )
    {
        Object.assign(this, props);
    }   
}


export class UserInputDto 
{
    first_name?: string;
    last_name?: string;
    email?: string;       
    gender?: string;
    id?: number; 

    constructor ( props: TUserInputProps )
    {
        Object.assign(this, props);    
    }

    getValues (): any
    {
        return InputsCleaner.clearInput({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,       
            gender: this.gender,
            id: this.id 
        });
    }
}


export class UserDatabaseDto
{
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly gender: string;    
    readonly id?: number;

    constructor ( props: TUserDatabaseProps )
    {
        Object.assign(this, props);
    }
    
    getValues (): any
    {
        return InputsCleaner.clearInput({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,       
            gender: this.gender,
            id: this.id 
        });
    }
}

