import { prisma } from "../../../database/prismaClient"
import {compare} from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient{
    username: string;
    password: string;
}


export class AuthenticateDeliverymanUseCase{

    async execute({username, password}:IAuthenticateClient){
   
        //Verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where:{
                username,
            } 
        })

        if(!deliveryman){throw new Error(`Client already exists`)}

        //Verificar se password cadastrado corresponde ao username

        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch){
            throw new Error(`Client  does not match password`)
        }

        //Gerar token 
        const token = sign({username}, "baf0e43e190ec58e5ee5edd9d8514316",{
          subject:deliveryman.id,
          expiresIn:"1d"  
        })

        return token;
        


    }


}