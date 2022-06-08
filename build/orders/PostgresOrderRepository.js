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
exports.PostgresOrderRepository = void 0;
const models_1 = __importDefault(require("../db/models"));
const utils_1 = require("../utils/utils");
class PostgresOrderRepository {
    constructor() {
        this.OrderConn = models_1.default.Order;
        this.OrderProductConn = models_1.default.OrderProduct;
    }
    getAllOrders({ page, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page === undefined || page === null ? 0 : page;
            perPage = perPage === undefined || perPage === null ? 1 : perPage;
            const orders = yield this.OrderConn.findAll({
                limit: perPage,
                offset: (page * perPage),
            });
            return orders;
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.OrderConn.findByPk(id);
            if (order.status === "Completed") {
                //cant cancel an order that is completed
                return null;
            }
            order === null || order === void 0 ? void 0 : order.set({ status: "Cancelled" });
            yield (order === null || order === void 0 ? void 0 : order.save());
            return order;
        });
    }
    createNewOrder(CreateOrderType) {
        return __awaiter(this, void 0, void 0, function* () {
            CreateOrderType["status"] = "Pending";
            CreateOrderType["shippingCost"] = 4.99;
            const order = yield this.OrderConn.create(CreateOrderType);
            return order;
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.OrderConn.findByPk(id);
            return order;
        });
    }
    updateOrder(id, orderUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            orderUpdate = (0, utils_1.removeNullOrUndefined)(orderUpdate);
            const order = yield this.OrderConn.findByPk(id);
            if (order.status !== "Pending") {
                //cant update an order thats been canceled or completed
                return null;
            }
            order === null || order === void 0 ? void 0 : order.set(orderUpdate);
            yield (order === null || order === void 0 ? void 0 : order.save());
            return order;
        });
    }
    addProductsToOrder(id, products) {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = [];
            //do bulk create here instead
            for (let product of products) {
                let orderedParameters = {
                    orderId: id,
                    productId: product.id,
                    salePrice: product.salePrice,
                    boughtPrice: product.boughtPrice
                };
                let order = yield this.OrderProductConn.create(orderedParameters);
                orders.push(order);
            }
            return orders;
        });
    }
    getProductsFromOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = [];
            products = yield this.OrderProductConn.findAll({ where: { orderId: id } });
            return products;
        });
    }
}
exports.PostgresOrderRepository = PostgresOrderRepository;
//# sourceMappingURL=PostgresOrderRepository.js.map