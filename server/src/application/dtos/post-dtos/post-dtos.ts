import InputsCleaner from "../../../utils/cleanInputs";
import cleanInputs from "../../../utils/cleanInputs";

export class PostApplicationDto
{
    readonly ownerId: number 
    readonly title: string
    readonly content: string        
    readonly id?: number
    readonly date?: Date

    constructor ( props: TPostApplicationProps )
    {
        Object.assign(this, props);
    }
}

export class PostInputDto 
{
    readonly owner_id?: number 
    readonly title?: string
    readonly content?: string       
    readonly id?: number
    readonly date?: Date

    constructor ( props: TPostInputProps )
    {
        Object.assign(this, props);    
    }

    getValues (): any
    {
        return InputsCleaner.clearInput ({
            owner_id: this.owner_id,
            title: this.title,
            content: this.content,
            id: this.id,
            date: this.date
        });
    }
}


export class PostDatabaseDto
{
    readonly owner_id: number 
    readonly title: string
    readonly content: string        
    readonly id?: number
    readonly date?: Date

    constructor ( props: TPostDatabaseProps )
    {
        Object.assign(this, props);
    }

    getValues (): any
    {
        return InputsCleaner.clearInput ({
            owner_id: this.owner_id,
            title: this.title,
            content: this.content,
            id: this.id,
            date: this.date
        });
    }
}
