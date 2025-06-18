import {Router} from 'express'
//middleware
import isAuthenticated from './Middleware/isAuthenticated';
//import user
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
const router = Router();

//rotas user

router.post('/users', new CreateUserController().handle);
router.get('/login', new AuthUserController().handle)

export {router}