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
exports.DetailUserController = void 0;
const DetailUserService_1 = require("../../service/user/DetailUserService");
class DetailUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.userId;
            const detailUserService = new DetailUserService_1.DetailUserService();
            const userInfo = yield detailUserService.execute({ userid });
            return res.json(userInfo);
        });
    }
}
exports.DetailUserController = DetailUserController;
