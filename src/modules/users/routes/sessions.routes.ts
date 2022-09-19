import { Router } from 'express';
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from '../controllers/SessionsController';
import {verify} from 'jsonwebtoken'

const sessionsRouter =  Router();
const sessionController = new SessionsController();


sessionsRouter.post(
   '/', 
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required(),
         password: Joi.string().required(),
      }
   }),
   sessionController.create,   
); 

export default sessionsRouter;
