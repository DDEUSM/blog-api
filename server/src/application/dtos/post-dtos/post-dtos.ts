
export class PostDto
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

export class DynamicPostDto 
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
}


