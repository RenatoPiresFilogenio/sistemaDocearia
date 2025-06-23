"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIngredientController = void 0;
const CreateIngredientService_1 = require("../../service/ingredients/CreateIngredientService");
class CreateIngredientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { unitConversion, totalUnit, totalPrice, name } = req.body;
            const createingredientservice = new CreateIngredientService_1.CreateIngredientService();
            const ingredient = yield createingredientservice.execute({ userId, unitConversion, totalUnit, totalPrice, name });
            return res.json(ingredient);
        });
    }
}
exports.CreateIngredientController = CreateIngredientController;
