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
exports.EditProductController = void 0;
const EditProductService_1 = require("../../service/products/EditProductService");
class EditProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { id, name, price } = req.body;
            const editproductservice = new EditProductService_1.EditProductService();
            const product = yield editproductservice.execute({ userId, id, name, price });
            return res.json(product);
        });
    }
}
exports.EditProductController = EditProductController;
