import AppError from "@shared/errors/appError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import  {userRepository} from '../typeorm/repositories/UserRepository'
 

interface IRequest {
   name: string,
   email: string,
   password: string  
}

class CreateUserService {
   public async execute ({name, email, password}: IRequest): Promise<User> {
      const usRepository = getCustomRepository(userRepository);
      const emailExists = await usRepository.findByEmail(email);

      if (emailExists){
         throw new AppError('Email address already used.');
      }

      const hashedPass = await hash(password, 8);

      const user = usRepository.create({
         name,
         password: hashedPass,
         email
      });

      await usRepository.save(user);

      return user;
   }
}

export default CreateUserService;
