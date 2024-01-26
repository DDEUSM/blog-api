import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export class Router
{
    constructor (
        private repositories: any,
        private httpServer: any
    ){}

    initAllRoutes(): void
    {
        const dirPath = path.dirname(fileURLToPath(import.meta.url));                
        const dirFiles = readdirSync(path.normalize(`${dirPath}/routes`))
        
        dirFiles.map(async (fileName, index) => 
        {           
            const routes = new (await import (`./routes/${fileName}`))
            .default(this.httpServer, this.repositories);

            routes.initRoutes();                        
            
            if(index == dirFiles.length - 1)
            {
                this.httpServer.useNotFound();                  
            }            
        });        
    }
}