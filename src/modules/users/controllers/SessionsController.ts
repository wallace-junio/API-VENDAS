import {Request, Response} from 'express'
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController{
   public async create(request: Request, response: Response): Promise<Response>{
      const {email, password} = request.body;

      const CreateSession = new CreateSessionsService();

      const user = await CreateSession.execute({
         email,
         password
      }); 
      return response.json(user);
   }

}


