
export class PostDto
{
    readonly ownerId: string 
    readonly title: string
    readonly content: string        
    readonly id?: string
    readonly date?: Date

    constructor ( props: TPostApplicationProps )
    {
        Object.assign(this, props);
    }
}

export class DynamicPostDto 
{
    readonly owner_id?: string 
    readonly title?: string
    readonly content?: string       
    readonly id?: string
    readonly date?: Date

    constructor ( props: TPostInputProps )
    {
        Object.assign(this, props);    
    }
}


