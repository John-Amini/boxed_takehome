"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderInput = exports.createOrderInput = void 0;
const yup_1 = require("yup");
exports.createOrderInput = (0, yup_1.object)({
    userId: (0, yup_1.number)().required().positive(),
    shippingLocation: (0, yup_1.string)().required(),
    products: (0, yup_1.array)().of((0, yup_1.number)().required()).required().min(1, "No Products"),
});
//look into making status an enumerable instead of a string for type here
exports.updateOrderInput = (0, yup_1.object)({
    userId: (0, yup_1.number)(),
    shippingLocation: (0, yup_1.string)(),
    status: (0, yup_1.string)(),
});
//# sourceMappingURL=types.js.map