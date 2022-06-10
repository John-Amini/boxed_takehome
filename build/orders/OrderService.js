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
exports.OrderService = void 0;
const types_1 = require("./types");
const shippingCost = 5.99;
class OrderService {
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
        this.orderRepo = orderRepo;
    }
    createOrder(newOrder, productAndQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            newOrder["status"] = "Pending";
            newOrder["shippingCost"] = shippingCost;
            newOrder["totalPrice"] = this.getTotalPrice(productAndQuantity, shippingCost);
            const order = yield this.orderRepo.createNewOrder(newOrder);
            const productsOrdered = yield this.orderRepo.addProductsToOrder(order.id, productAndQuantity);
            return this.getOrder(order.id, undefined);
        });
    }
    getTotalPrice(productAndQuantity, shippingCost) {
        let costOfProducts = productAndQuantity.reduce((sum, productAndQuantity) => {
            return (productAndQuantity.product.salePrice * productAndQuantity.quantity) + sum;
        }, 0);
        return costOfProducts + shippingCost;
    }
    getOrder(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepo.getOrder(id, select);
            return order;
        });
    }
    getAllOrders(select, pageInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepo.getAllOrders(select, pageInfo);
            return orders;
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkIfExists = yield this.orderRepo.getOrder(id, undefined);
            if ((checkIfExists === null || checkIfExists === void 0 ? void 0 : checkIfExists.status) === types_1.status.Cancelled) {
                throw new Error("Order already completed");
            }
            const order = yield this.orderRepo.deleteOrder(id);
            return order;
        });
    }
    updateOrder(id, orderUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderToBeUpdated = yield this.getOrder(id, undefined);
            if ((orderToBeUpdated === null || orderToBeUpdated === void 0 ? void 0 : orderToBeUpdated.status) === types_1.status.Cancelled || (orderToBeUpdated === null || orderToBeUpdated === void 0 ? void 0 : orderToBeUpdated.status) === types_1.status.Completed) {
                throw new Error(`Order has already been ${orderToBeUpdated === null || orderToBeUpdated === void 0 ? void 0 : orderToBeUpdated.status}, cannot update`);
            }
            const order = yield this.orderRepo.updateOrder(id, orderUpdate);
            return order;
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map