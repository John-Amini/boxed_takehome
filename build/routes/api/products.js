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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const yup_1 = require("yup");
const IProductRepository_1 = require("../../products/IProductRepository");
const ProductService_1 = require("../../products/ProductService");
const types_1 = require("../../products/types");
exports.router = express_1.default.Router();
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.router.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // "/api/products/9"
        let service = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let product = yield service.getProduct(req.params.id);
        if (product === null) {
            res.status(400);
            return res.json({ "Error": "Not Found" });
        }
        return res.json(product);
    }
    catch (err) {
        res.status(500);
        let errorMessage = getErrorMessage(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //need to figure how to paginate all the products here
        //skip is page * perPage
        //limit is perPage
        let service = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let products = yield service.getAllProducts();
        console.log(req.query);
        return res.json(products);
    }
    catch (err) {
        res.status(500);
        let errorMessage = getErrorMessage(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let service = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let newProductParameters = yield types_1.createProductInput.validate(req.body);
        let newProduct = yield service.createProduct(newProductParameters);
        return res.json({ newProduct });
    }
    catch (err) {
        if (err instanceof yup_1.ValidationError) {
            res.status(400);
        }
        let errorMessage = getErrorMessage(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.delete('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let service = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let markedForDeletedProduct = yield service.deleteProduct(req.params.id);
        return res.json({ markedForDeletedProduct });
    }
    catch (err) {
        res.status(500);
        let errorMessage = getErrorMessage(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let service = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let updatedProductParameters = req.body;
        let updatedProduct = yield service.updateProduct(req.params.id, updatedProductParameters);
        return res.json({ updatedProduct });
    }
    catch (err) {
        res.status(500);
        let errorMessage = getErrorMessage(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.default = exports.router;
//# sourceMappingURL=products.js.map