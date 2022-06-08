"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductInput = exports.createProductInput = void 0;
const yup_1 = require("yup");
exports.createProductInput = (0, yup_1.object)({
    name: (0, yup_1.string)().required(),
    salePrice: (0, yup_1.number)().required().positive(),
    boughtPrice: (0, yup_1.number)().required().positive(),
    imageURL: (0, yup_1.string)().url(),
    weight: (0, yup_1.number)().required().positive(),
    description: (0, yup_1.string)(),
});
// export type CreateProductType = {
//     name:string,
//     salePrice:number,
//     boughtPrice:number,
//     imageURL?:string,
//     weight:number,
//     description?:string
// }
exports.updateProductInput = (0, yup_1.object)({
    name: (0, yup_1.string)(),
    salePrice: (0, yup_1.number)().positive(),
    boughtPrice: (0, yup_1.number)().positive(),
    imageURL: (0, yup_1.string)().url(),
    weight: (0, yup_1.number)().positive(),
    description: (0, yup_1.string)(),
});
// export type UpdateProductType = {
//     name?:string,
//     salePrice?:number,
//     boughtPrice?:number,
//     imageURL?:string,
//     weight?:number,
//     description?:string
// };
//# sourceMappingURL=types.js.map