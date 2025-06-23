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
exports.DetailUserService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DetailUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userid }) {
            if (!userid) {
                throw new Error("id invalido");
            }
            try {
                const id = userid;
                const userDetail = yield prisma_1.default.user.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        name: true,
                        email: true,
                        products: {
                            select: {
                                name: true,
                                price: true,
                            }
                        },
                        ingredients: {
                            select: {
                                name: true,
                                unitConversion: true,
                                totalPrice: true,
                                totalUnit: true,
                                unitPrice: true,
                            }
                        }
                    }
                });
                return userDetail;
            }
            catch (error) {
                console.error("Erro ao buscar usuário:", error);
                throw new Error("Erro interno ao buscar dados do usuário");
            }
        });
    }
}
exports.DetailUserService = DetailUserService;
