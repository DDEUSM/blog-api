import { ApiError } from "../domain/errors/api-error";


type SchemaTypes = "string" | "email" | "number" | "uuid" | "date";

export type TInputSchema = {
    [key: string]: { type: SchemaTypes, required?: boolean }
}


export class Validator
{
    static validateInputs (req: any, res: any, next: any, schema: TInputSchema)
    {           
        const schemaKeys = Object.keys(schema);
        let error = false;

        Object.keys(req.body).map(key => 
        {
            if (!schemaKeys.includes(key))
            {
                throw new ApiError(400, "Bad request, invalid body request properties!");
            }                
        });        

        const verifyInputs = schemaKeys.reduce((results: any, key: string) => 
        {
            if (req.body[key])
            {
                results[key] = this[schema[key].type](req.body[key])? true 
                : function(){ error = true; return false}();                
                return results;
            }

            results[key] = !schema[key].required? true 
            : function(){ error = true; return false}();
            return results;
            
        }, {});
        
        if (error)
        {
            throw new ApiError(400, `Bad request, invalid body request type values ${JSON.stringify(verifyInputs)}!`);
        }

        next();
    }

    private static email (value: string)
    { 
        return /^\w+.+?@\w+.+?$/.test(value); 
    }  
    
    private static number (value: string)
    { 
        return !isNaN(Number(value) + 1)? true : false;
    }

    private static string (value: string)
    { 
        return typeof value === "string"? true : false; 
    }

    private static date (value: string)
    { 
        return true;
    }

    private static uuid (value: string)
    { 
        return true;
    }
}

