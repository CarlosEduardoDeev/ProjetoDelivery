import { NextFunction, Request, response, Response } from "express";
import { verify} from "jsonwebtoken"

interface Ipayload{
    sub: string;
}

export async function ensureAuthenticateDelivery(
    request: Request ,
    reponse: Response, 
    next:NextFunction){
        const authHeader = request.headers.authorization;

        if(!authHeader){
        return response.status(401).json({mg: "Token missing authorization"})
        }


        const [,token] = authHeader.split(" ");

        try {
            const {sub} = verify(token,"baf0e43e190ec58e5ee5edd9d8514316") as Ipayload;

            request.id_deliveryman = sub

            return next();
        } catch (err) {
            return response.status(401).json({msg: "Token invalid!"})
        }
}