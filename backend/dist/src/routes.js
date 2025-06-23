"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//middleware
const isAuthenticated_1 = __importDefault(require("./Middleware/isAuthenticated"));
//import user
const CreateUserController_1 = require("./controller/user/CreateUserController");
const AuthUserController_1 = require("./controller/user/AuthUserController");
const DetailUserController_1 = require("./controller/user/DetailUserController");
//import ingredients
const CreateIngredientsController_1 = require("./controller/ingredients/CreateIngredientsController");
const ListIngredientController_1 = require("./controller/ingredients/ListIngredientController");
const DeleteIngredientController_1 = require("./controller/ingredients/DeleteIngredientController");
const EditIngredientController_1 = require("./controller/ingredients/EditIngredientController");
//import products
const CreateProductController_1 = require("./controller/products/CreateProductController");
const ListProductController_1 = require("./controller/products/ListProductController");
const UpdateProductController_1 = require("./controller/products/UpdateProductController");
const DeleteProductController_1 = require("./controller/products/DeleteProductController");
const EditProductController_1 = require("./controller/products/EditProductController");
const router = (0, express_1.Router)();
exports.router = router;
//routes user
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/login', new AuthUserController_1.AuthUserController().handle);
router.get('/userInfo', isAuthenticated_1.default, new DetailUserController_1.DetailUserController().handle);
//routes ingredients
router.post('/ingredient', isAuthenticated_1.default, new CreateIngredientsController_1.CreateIngredientController().handle);
router.get("/listIngredient", isAuthenticated_1.default, new ListIngredientController_1.ListIngredientController().handle);
router.delete("/deleteIngredient", isAuthenticated_1.default, new DeleteIngredientController_1.DeleteIngredientController().handle);
router.patch("/updateIngredient", isAuthenticated_1.default, new EditIngredientController_1.EditIngredientController().handle);
//routes products
router.post('/product', isAuthenticated_1.default, new CreateProductController_1.CreateProductController().handle);
router.get('/productlist', isAuthenticated_1.default, new ListProductController_1.ListProductController().handle);
router.post('/productUpdate', isAuthenticated_1.default, new UpdateProductController_1.UpdateProductController().handle);
router.delete('/productDelete', isAuthenticated_1.default, new DeleteProductController_1.DeleteProductController().handle);
router.patch("/productUpdate", isAuthenticated_1.default, new EditProductController_1.EditProductController().handle);
