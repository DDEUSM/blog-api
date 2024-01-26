
export class Post
{
    constructor (        
        readonly owner_id: string, 
        readonly title: string,
        readonly content: string,        
        readonly id?: string,
        readonly date?: string
    ){}

}