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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, id, name }) {
            var _b;
            if (!id || !userId) {
                throw new Error("Product ID or User ID is missing");
            }
            if (name) {
                yield prisma_1.default.product.update({
                    where: { id },
                    data: { name }
                });
            }
            const productWithIngredients = yield prisma_1.default.product.findUnique({
                where: { id },
                include: {
                    ingredients: {
                        include: {
                            ingredient: true
                        }
                    }
                }
            });
            if (!productWithIngredients || productWithIngredients.userId !== userId) {
                throw new Error("Product not found or not authorized");
            }
            let RefreshPrice = 0;
            for (const item of productWithIngredients.ingredients) {
                const unitPrice = (_b = item.ingredient.unitPrice) !== null && _b !== void 0 ? _b : item.ingredient.unitPrice;
                const quantity = item.quantity;
                RefreshPrice += unitPrice * quantity;
            }
            const updatedProduct = yield prisma_1.default.product.update({
                where: { id },
                data: {
                    price: RefreshPrice
                }
            });
            return updatedProduct;
        });
    }
}
exports.UpdateProductService = UpdateProductService;
