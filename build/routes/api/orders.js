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
const IOrderRepository_1 = require("../../orders/IOrderRepository");
const OrderService_1 = require("../../orders/OrderService");
const types_1 = require("../../orders/types");
const IProductRepository_1 = require("../../products/IProductRepository");
const ProductService_1 = require("../../products/ProductService");
const utils_1 = require("../../utils/utils");
exports.router = express_1.default.Router();
exports.router.post("/", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //create new order
    try {
        let service = new OrderService_1.OrderService((0, IOrderRepository_1.getOrderRepository)());
        let newOrderParameters = yield types_1.createOrderInput.validate(req.body);
        let productIdsAndQuantity = req.body.products;
        let products = productIdsAndQuantity.map(x => x.id);
        let productService = new ProductService_1.ProductService((0, IProductRepository_1.getProductRepository)());
        let productsArray = yield productService.getListOfProducts(products);
        if (productsArray === null || productsArray.length !== products.length) {
            res.status(400);
            return res.json({ "Error": `An item does not exist` });
        }
        let productListWithQuantities = (0, utils_1.createOrderedProductsList)(productIdsAndQuantity, productsArray);
        let newOrder = yield service.createOrder(newOrderParameters, productListWithQuantities);
        // let orderedProducts = await service.addProductsToOrder(newOrder.id,productListWithQuantities);
        return res.json({ newOrder });
    }
    catch (err) {
        if (err instanceof yup_1.ValidationError) {
            res.status(400);
        }
        else {
            res.status(500);
        }
        let errorMessage = (0, utils_1.getErrorMessage)(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.get("/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //get one order
    try {
        let service = new OrderService_1.OrderService((0, IOrderRepository_1.getOrderRepository)());
        let query = req.query;
        let select = (_a = query.select) === null || _a === void 0 ? void 0 : _a.split(",");
        let order = yield service.getOrder(req.params.id, select);
        if (order === null) {
            res.status(400);
            return res.json({ "Error": "Not Found" });
        }
        return res.json({ order });
    }
    catch (err) {
        res.status(500);
        let errorMessage = (0, utils_1.getErrorMessage)(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.get("/", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get all orders
    var _b;
    try {
        let select = (_b = req.query.select) === null || _b === void 0 ? void 0 : _b.split(",");
        let service = new OrderService_1.OrderService((0, IOrderRepository_1.getOrderRepository)());
        let orders = yield service.getAllOrders(select, req.query);
        return res.json(orders);
    }
    catch (err) {
        res.status(500);
        let errorMessage = (0, utils_1.getErrorMessage)(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.delete("/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let service = new OrderService_1.OrderService((0, IOrderRepository_1.getOrderRepository)());
        console.log(req.params.id);
        let canceledOrder = yield service.deleteOrder(req.params.id);
        if (canceledOrder === null) {
            res.status(400);
            return res.json({ "Error": "Not Found" });
        }
        return res.json({ canceledOrder });
    }
    catch (err) {
        res.status(500);
        let errorMessage = (0, utils_1.getErrorMessage)(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.router.put("/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //update order
    try {
        let service = new OrderService_1.OrderService((0, IOrderRepository_1.getOrderRepository)());
        let updatedOrderParameters = yield types_1.updateOrderInput.validate(req.body);
        let updatedOrder = yield service.updateOrder(req.params.id, updatedOrderParameters);
        if (updatedOrder === null) {
            res.status(400);
            return res.json({ "Error": "Not Found" });
        }
        return res.json({ updatedOrder });
    }
    catch (err) {
        if (err instanceof yup_1.ValidationError) {
            res.status(400);
        }
        else {
            res.status(500);
        }
        let errorMessage = (0, utils_1.getErrorMessage)(err);
        return res.json({ "Error": errorMessage });
    }
})));
exports.default = exports.router;
//# sourceMappingURL=orders.js.map