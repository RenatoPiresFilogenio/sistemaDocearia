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
exports.DeleteProductService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, userId }) {
            if (!id || !userId) {
                throw new Error("invalid id user or id product");
            }
            const product = yield prisma_1.default.product.findFirst({
                where: {
                    id,
                    userId
                }
            });
            if (!product) {
                throw new Error("Product not found or you don't have permission to delete it");
            }
            const deleteassoctable = yield prisma_1.default.productIngredient.deleteMany({
                where: {
                    productId: product.id
                }
            });
            const deleteproduct = yield prisma_1.default.product.delete({
                where: {
                    id: product.id
                }
            });
            return deleteproduct;
        });
    }
}
exports.DeleteProductService = DeleteProductService;
