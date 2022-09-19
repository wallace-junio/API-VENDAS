import AppError from '@shared/errors/appError';
import {Request, Response, NextFunction} from 'express'
import AuthConfig from '@config/auth'
import {verify} from 'jsonwebtoken'

export default function isAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction
): void{
   const authHeader = request.headers.authorization;

   if(!authHeader){
      throw new AppError('JWT Token is missing.');
   }

   //Bearer erghwrehtwrtyhwrthwqerthgwrwq2edswqe
   const [,token] = authHeader.split(' ');

   try{
      const decodeToken = verify(token, AuthConfig.jwt.secret);

      return next();
   }catch{
      throw new AppError('Invalid JWT Token.')
   }
}
