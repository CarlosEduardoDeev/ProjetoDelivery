import { prisma } from "../../../../database/prismaClient";
import {hash} from "bcrypt"


interface ICreateClient{
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({password,username}:ICreateClient){
        // VALIDAR SE O USUARIO JA EXISTE  

        const clientExist = await prisma.clients.findFirst({
            where:{
                username:{
                    equals:username,
                    mode:"insensitive"
                }
            }
        })
        if(clientExist){throw new Error("Client já existe")}



        //CRIPTOGRAFAR A SENHA 

        const hashPassword = await hash(password, 10)


        //SALVAR O CLIENT NO BANCO

        const client = await prisma.clients.create({
            data:{
                username,
                password: hashPassword
            }
        })

        return client;

    }


}