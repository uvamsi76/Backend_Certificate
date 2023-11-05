"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = 'SECr3t'; // This should be in an environment variable in a real application
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, payload) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "unauthorised not your role" });
            }
            else if (payload && typeof payload !== "string") {
                req.headers["email"] = payload.email;
                req.headers["userId"] = payload.id;
                next();
            }
            else {
                return res.status(403).json({ message: "error" });
            }
        });
    }
    else {
        res.status(401).json({ message: "UnAuthorised login first" });
        return;
    }
};
exports.authenticateJwt = authenticateJwt;
