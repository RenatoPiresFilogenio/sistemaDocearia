import {Router} from 'express'
//middleware
import isAuthenticated from './Middleware/isAuthenticated';
//import user
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
import { DetailUserController } from './controller/user/DetailUserController';
//import ingredients
import { CreateIngredientController } from './controller/ingredients/CreateIngredientsController';
import { ListIngredientController } from './controller/ingredients/ListIngredientController';
import { DeleteIngredientController } from './controller/ingredients/DeleteIngredientController';
import { EditIngredientController } from './controller/ingredients/EditIngredientController';
//import products
import { CreateProductController } from './controller/products/CreateProductController';
import { ListProductController } from './controller/products/ListProductController';
import { UpdateProductController } from './controller/products/UpdateProductController';
import { DeleteProductController } from './controller/products/DeleteProductController';
import { DeleteIngredientProductController } from './controller/products/DeleteIngredientProductController';
const router = Router();

//routes user
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle)
router.get('/userInfo', isAuthenticated, new DetailUserController().handle)
//routes ingredients
router.post('/ingredient', isAuthenticated, new CreateIngredientController().handle)
router.get("/listIngredient", isAuthenticated, new ListIngredientController().handle)
router.delete("/deleteIngredient", isAuthenticated, new DeleteIngredientController().handle)
router.patch("/updateIngredient", isAuthenticated, new EditIngredientController().handle)
//routes products
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/productlist', isAuthenticated, new ListProductController().handle)
router.post('/productUpdate',isAuthenticated, new UpdateProductController().handle)
router.delete('/productDelete',isAuthenticated, new DeleteProductController().handle)
router.delete('/productDeleteIngredient',isAuthenticated, new DeleteIngredientProductController().handle)
export {router}