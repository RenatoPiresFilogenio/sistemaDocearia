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
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ UserId, name, ingredients }) {
            if (!UserId || !name || !ingredients || ingredients.length === 0) {
                throw new Error("Please provide all required data.");
            }
            const ingredientIds = ingredients.map(item => item.id);
            const foundIngredients = yield prisma_1.default.ingredient.findMany({
                where: {
                    id: { in: ingredientIds }
                }
            });
            if (foundIngredients.length !== ingredientIds.length) {
                throw new Error("One or more ingredients not found");
            }
            let totalPrice = 0;
            for (const item of ingredients) {
                const ing = foundIngredients.find(i => i.id === item.id);
                if (!ing) {
                    throw new Error(`Ingredient with id ${item.id} not found`);
                }
                totalPrice += ing.unitPrice * item.quantity;
                if (totalPrice <= 0) {
                    throw new Error(`Price Need be positive`);
                }
            }
            const product = yield prisma_1.default.product.create({
                data: {
                    name,
                    price: totalPrice,
                    userId: UserId,
                    ingredients: {
                        create: ingredients.map(item => ({
                            ingredientId: item.id,
                            quantity: item.quantity
                        }))
                    }
                },
                include: {
                    ingredients: true
                }
            });
            return product;
        });
    }
}
exports.CreateProductService = CreateProductService;
