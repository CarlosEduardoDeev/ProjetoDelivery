import {Request,Response} from 'express'
import {AuthenticationClientUseCase} from './AuthenticateClientUseCase'

export class AuthenticateClientController{

    async handle(req: Request, res: Response){

        const {username, password} = req.body;

        const autheenticateClientUseCase = new AuthenticationClientUseCase(); //

        const result = await autheenticateClientUseCase.execute({
            username,
            password
        })

        return res.json(result)

       
    }

}