"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
router.use("/products", products_1.default);
router.use("/orders", orders_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map