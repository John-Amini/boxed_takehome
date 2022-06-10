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
    getAllOrders(select, { page, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page === undefined || page === null ? 0 : page;
            perPage = perPage === undefined || perPage === null ? 10 : perPage;
            if (select === undefined) {
                const orders = yield this.OrderConn.findAll({
                    limit: perPage,
                    offset: (page & perPage),
                    include: { model: models_1.default.OrderProduct }
                });
                return orders;
            }
            else if (select.includes("OrderProduct")) {
                const filterSelect = select.filter(x => x !== "OrderProduct");
                const orders = yield this.OrderConn.findAll({
                    attributes: filterSelect,
                    include: { model: models_1.default.OrderProduct }
                });
                return orders;
            }
            else {
                const orders = yield this.OrderConn.findAll({
                    limit: perPage,
                    offset: (page * perPage),
                    attributes: select
                });
                return orders;
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //move to service do get in service if completed return null if not call delete
            console.log("are we here");
            const order = yield this.OrderConn.findByPk(id);
            order === null || order === void 0 ? void 0 : order.set({ status: "Cancelled" });
            yield (order === null || order === void 0 ? void 0 : order.save());
            return order;
        });
    }
    createNewOrder(CreateOrderType) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.OrderConn.create(CreateOrderType);
            return order;
        });
    }
    getOrder(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            if (select === undefined) {
                const order = yield this.OrderConn.findByPk(id, { include: { model: models_1.default.OrderProduct } });
                return order;
            }
            else if (select.includes("OrderProduct")) {
                const filterSelect = select.filter(x => x !== "OrderProduct");
                const order = yield this.OrderConn.findByPk(id, { attributes: filterSelect, include: { model: models_1.default.OrderProduct } });
                return order;
            }
            else {
                const order = yield this.OrderConn.findByPk(id, { attributes: select });
                return order;
            }
        });
    }
    updateOrder(id, orderUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            orderUpdate = (0, utils_1.removeNullOrUndefined)(orderUpdate);
            const order = yield this.OrderConn.findByPk(id);
            order === null || order === void 0 ? void 0 : order.set(orderUpdate);
            yield (order === null || order === void 0 ? void 0 : order.save());
            return order;
        });
    }
    addProductsToOrder(id, products) {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = [];
            let arrForBulkCreate = [];
            for (let productAndQuantity of products) {
                let orderedParameters = {
                    orderId: id,
                    productId: productAndQuantity.product.id,
                    salePrice: productAndQuantity.product.salePrice,
                    boughtPrice: productAndQuantity.product.boughtPrice,
                    quantity: productAndQuantity.quantity
                };
                arrForBulkCreate.push(orderedParameters);
            }
            orders = yield this.OrderProductConn.bulkCreate(arrForBulkCreate);
            return orders;
        });
    }
}
exports.PostgresOrderRepository = PostgresOrderRepository;
//# sourceMappingURL=PostgresOrderRepository.js.map