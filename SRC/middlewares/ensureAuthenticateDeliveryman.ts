import { NextFunction, Request, response, Response } from "express";
import { verify} from "jsonwebtoken"

interface Ipayload{
    sub: string;
}

export async function ensureAuthenticateDeliveryman(
    request: Request ,
    reponse: Response, 
    next:NextFunction){
        const authHeader = request.headers.authorization;

        if(!authHeader){throw new Error("Token perdeu a validação ")}


        const [,token] = authHeader.split(" ");

        try {
            const {sub} = verify(token,"baf0e43e190ec58e5ee5edd9d8514316") as Ipayload;

            request.id_deliveryman = sub

            return next();
        } catch (err) {throw new Error("Token é invalido ")}
}