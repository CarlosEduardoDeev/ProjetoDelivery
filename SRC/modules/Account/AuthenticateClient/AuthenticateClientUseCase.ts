import { prisma } from "../../../database/prismaClient"
import {compare} from 'bcrypt'
import { sign} from 'jsonwebtoken'

interface IAuthenticateClient{
    username: string;
    password: string;
}


export class AuthenticationClientUseCase{

    async execute({username, password}:IAuthenticateClient){
   
        //Verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where:{
                username,
            } 
        })

        if(!client){throw new Error(`Client already exists`)}

        //Verificar se password cadastrado corresponde ao username

        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch){
            throw new Error(`Client  does not match password`)
        }

        //Gerar token 
        const token = sign({username}, "baf0e43e190ec58e5ba5edd9d8514316",{
          subject:client.id,
          expiresIn:"1d"  
        })

        return token;
        


    }


}