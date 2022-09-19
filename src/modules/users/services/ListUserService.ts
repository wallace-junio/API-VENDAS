import {getCustomRepository} from 'typeorm';
import User from '../typeorm/entities/User';
import userRepository from '../typeorm/repositories/UserRepository';



class ListUserService{
   public async execute(): Promise<User[] >{
      const usRepository= getCustomRepository(userRepository);

      const user = await usRepository.find();

      return user;
   }

}

export default ListUserService
