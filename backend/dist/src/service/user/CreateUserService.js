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
exports.CreateUserService = void 0;
const index_1 = __importDefault(require("../../../prisma/index"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            if (!email || !password || !name) {
                throw new Error("User creation failed: Email and password are required.");
            }
            try {
                const hashPass = yield (0, bcryptjs_1.hash)(password, 10);
                const user = yield index_1.default.user.create({
                    data: {
                        name,
                        email,
                        password: hashPass
                    },
                    select: {
                        name: true,
                        email: true,
                    }
                });
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.CreateUserService = CreateUserService;
