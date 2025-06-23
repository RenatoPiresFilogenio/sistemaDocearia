"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const auttoken = req.headers.authorization;
    if (!auttoken) {
        return res.status(401).end();
    }
    const [, token] = auttoken.split(' ');
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = sub;
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.default = isAuthenticated;
