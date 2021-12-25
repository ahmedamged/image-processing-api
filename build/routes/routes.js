"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./api/resize"));
var mainRoutes = express_1.default.Router();
mainRoutes.get('/', function (req, res) {
    res.send('Main API Route');
});
mainRoutes.use('/resize', resize_1.default);
exports.default = mainRoutes;
