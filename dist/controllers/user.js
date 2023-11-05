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
exports.handlelogin = exports.generatehash = exports.verifyhash = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validateemail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            return false;
        }
        if (user.password != password) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Error finding user:', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
const emailvalidate = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            return false;
        }
        return user;
    }
    catch (error) {
        console.error('Error finding user:', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
const verifyhash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hash } = req.body;
    const decodeddata = atob(hash);
    const email = decodeddata.split(" ")[0];
    const user = yield emailvalidate(email);
    if (!user) {
        res.status(404).send({ message: "enter valid certificate" });
        return;
    }
    res.status(200).send({ user });
});
exports.verifyhash = verifyhash;
const generatehash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validation = yield validateemail(email, password);
    if (!validation) {
        res.status(404).send({ message: "invalid credentials or not registered to cohort" });
        return;
    }
    if (!process.env.CERT_SECRET) {
        res.status(500).send({ message: "certificate failed Internal error" });
        return;
    }
    const data = email + " " + process.env.CERT_SECRET;
    const hash = btoa(data);
    if (!hash) {
        res.status(500).send({ message: "certificate failed Internal error" });
        return;
    }
    res.status(200).send({ certificate: hash });
});
exports.generatehash = generatehash;
const handlelogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield emailvalidate(email);
        if (!user) {
            res.status(403).json({ message: 'User not found' });
            return;
        }
        if (user.password != password) {
            console.log(user);
            res.status(404).json({ message: "Incorrect Password" });
            return;
        }
        console.log(user.id);
        const token = jsonwebtoken_1.default.sign({ email, id: user.id }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token, email });
    }
    catch (err) {
        res.status(500).json({ message: "internal error sorry for the inconvinience" });
    }
});
exports.handlelogin = handlelogin;
