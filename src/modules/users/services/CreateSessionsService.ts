import AppError from "@shared/errors/appError";
import {sign} from 'jsonwebtoken'
import authConfig from "@config/auth";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User"; 
import  {userRepository} from '../typeorm/repositories/UserRepository'
import { compare } from 'bcryptjs';
import { config } from "process";

interface IRequest {
   email:   string,
   password: string  
}

interface IResponse {
   user: User;
   token: string;
}

class CreateSessionsService {
   public async execute ({email, password}: IRequest): Promise<IResponse> {
      const usRepository = getCustomRepository(userRepository);
      const user = await usRepository.findByEmail(email);
    
      if (!user){
         throw new AppError('Incorrect Email/password. User is not found!.', 401);
      }

      const passwordConfirmed = await compare(password, user.password); 

      if (!passwordConfirmed){
         throw new AppError('Incorrect Email/password combination!.', 401);
      }

      const token = sign({}, authConfig.jwt.secret,  {
         subject: user.id,
         expiresIn: authConfig.jwt.expiresIn,
      });

      return {
         user,
         token
      };
   }
}

export default CreateSessionsService;
