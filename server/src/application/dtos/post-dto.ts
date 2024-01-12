export class PostDto
{
    constructor (        
        readonly owner_id: number, 
        readonly title: string,
        readonly content: string,        
        readonly id?: number
    ){}
}