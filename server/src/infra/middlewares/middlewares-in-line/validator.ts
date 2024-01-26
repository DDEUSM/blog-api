
import { ApiError } from "../../../domain/errors/api-error";


type SchemaTypes = "string" | "email" | "number" | "uuidv4" | "date";

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
        return Number(value)? true : false;
    }

    private static string (value: string)
    { 
        return typeof value === "string"? true : false; 
    }

    private static date (value: string)
    { 
        return new Date(value).getDay()? true : false;
    }

    private static uuidv4 (value: string)
    { 
        const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;        
        return regex.exec(value)? true : false;       
    }
}

