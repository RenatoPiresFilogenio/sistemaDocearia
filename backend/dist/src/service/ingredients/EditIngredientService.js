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
exports.EditIngredientService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class EditIngredientService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, userId, name, unitConversion, totalUnit, totalPrice }) {
            if (!userId || !id) {
                throw new Error("User ID and Ingredient ID are required.");
            }
            const ingredient = yield prisma_1.default.ingredient.findFirst({
                where: {
                    id,
                    userId,
                },
            });
            if (!ingredient) {
                throw new Error("Ingredient not found or you don't have permission.");
            }
            const dataToUpdate = {};
            if (name !== undefined)
                dataToUpdate.name = name;
            if (unitConversion !== undefined)
                dataToUpdate.unitConversion = unitConversion;
            if (totalUnit !== undefined)
                dataToUpdate.totalUnit = totalUnit;
            if (totalPrice !== undefined)
                dataToUpdate.totalPrice = totalPrice;
            if (totalPrice !== undefined && totalPrice > 0 && totalUnit !== undefined && totalUnit !== 0) {
                dataToUpdate.unitPrice = totalPrice / totalUnit;
            }
            const updatedIngredient = yield prisma_1.default.ingredient.update({
                where: { id },
                data: dataToUpdate,
                select: {
                    id: true,
                    name: true,
                    unitConversion: true,
                    unitPrice: true,
                    totalUnit: true,
                    totalPrice: true,
                }
            });
            return updatedIngredient;
        });
    }
}
exports.EditIngredientService = EditIngredientService;
