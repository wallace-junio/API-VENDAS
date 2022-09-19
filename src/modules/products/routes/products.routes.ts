import {Router} from 'express';
import ProductsController from '../controllers/ProductsController';
import {celebrate, Joi, Segments} from 'celebrate'
import { join } from 'path';

const productsRouter = Router();
const productsController = new ProductsController();

//Rota Index
productsRouter.get('/', productsController.index);

//Rota para mostrar um produto
productsRouter.get('/:id',
   celebrate({
      [Segments.PARAMS]: { 
         id: Joi.string().uuid().required()
      }
   }),
   productsController.show);

//Rota para criar um produto
productsRouter.post('/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         price: Joi.number().precision(2).required(),
         quantity: Joi.number().required()
      }
   }),
   productsController.create);

//Rota para alterar um produto
productsRouter.put('/:id',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         price: Joi.number().precision(2).required(),
         quantity: Joi.number().required()
      }
   }),
   productsController.update);

//Rota para deletar produto
productsRouter.delete('/:id',
   celebrate({
      [Segments.PARAMS]: { 
         id: Joi.string().uuid().required()
      }
   }),
   productsController.delete);

export default productsRouter 
