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
exports.EditProductService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class EditProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, userId, name, price }) {
            if (!userId || !id) {
                throw new Error("User ID and Product ID are required.");
            }
            const ingredient = yield prisma_1.default.product.findFirst({
                where: {
                    id,
                    userId,
                },
            });
            if (!ingredient) {
                throw new Error("Product not found or you don't have permission.");
            }
            const dataToUpdate = {};
            if (name !== undefined)
                dataToUpdate.name = name;
            if (price !== undefined)
                dataToUpdate.price = price;
            if (price < 0) {
                throw new Error("Price cant be below 0");
            }
            const updateProduct = yield prisma_1.default.product.update({
                where: { id },
                data: dataToUpdate,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    ingredients: {
                        select: {
                            ingredient: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            return updateProduct;
        });
    }
}
exports.EditProductService = EditProductService;
