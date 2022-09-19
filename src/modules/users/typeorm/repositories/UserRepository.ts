import {Repository, EntityRepository} from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class userRepository extends Repository<User> {
 
   public async findByName(name : String): Promise<User | undefined>{
      
      const user = await this.findOne({
         where: {
            name,
         },     
      });
      
      return user;
   }

   public async findById(id : String): Promise<User | undefined>{
      
      const user = await this.findOne({
         where: {
            id,
         },     
      });
      
      return user;
   }


   public async findByEmail(email: String): Promise<User | undefined>{
      
      const user = await this.findOne({
         where: {
            email,
         },     
      });
      
      return user;
   }
}

export default userRepository;
