import {Request,Response,NextFunction } from "express";


export function schemaValidate(schema:any) {
    return (req:Request, res:Response, next:NextFunction) => {
            const data = req.body;
            const { error } = schema.validate(data);
            if (error) throw {code:'Invalid',message: error.details[0].message };
            next();
        
}
}