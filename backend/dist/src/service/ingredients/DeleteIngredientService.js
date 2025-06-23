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
exports.DeleteIngredientService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteIngredientService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, userid }) {
            if (!id) {
                throw new Error("Ingredient invalid");
            }
            if (!userid) {
                throw new Error("user not authorized");
            }
            const ingredient = yield prisma_1.default.ingredient.findFirst({
                where: {
                    id: id,
                    userId: userid,
                },
            });
            if (!ingredient) {
                throw new Error("Ingredient not found or you don't have permission.");
            }
            yield prisma_1.default.productIngredient.deleteMany({
                where: {
                    ingredientId: ingredient.id
                }
            });
            yield prisma_1.default.ingredient.delete({
                where: {
                    id: ingredient.id,
                },
            });
            return { message: "Ingredient deleted successfully." };
        });
    }
}
exports.DeleteIngredientService = DeleteIngredientService;
