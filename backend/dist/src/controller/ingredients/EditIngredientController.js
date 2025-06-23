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
exports.EditIngredientController = void 0;
const EditIngredientService_1 = require("../../service/ingredients/EditIngredientService");
class EditIngredientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { id, name, unitConversion, totalUnit, totalPrice } = req.body;
            const editingredientservice = new EditIngredientService_1.EditIngredientService();
            const ingredient = yield editingredientservice.execute({ userId, id, name, unitConversion, totalUnit, totalPrice });
            return res.json(ingredient);
        });
    }
}
exports.EditIngredientController = EditIngredientController;
