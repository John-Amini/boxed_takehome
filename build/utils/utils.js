"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderedProductsList = exports.getErrorMessage = exports.removeNullOrUndefined = void 0;
function removeNullOrUndefined(update) {
    for (const key in update) {
        if (update[key] === null || update[key] === undefined) {
            delete update[key];
        }
    }
    return update;
}
exports.removeNullOrUndefined = removeNullOrUndefined;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
function createOrderedProductsList(productIdsAndQuantity, productsArray) {
    let map = new Map();
    for (let curr of productIdsAndQuantity) {
        map.set(parseInt(curr.id), parseInt(curr.quantity));
    }
    return productsArray.map(product => {
        var _a;
        return { product, quantity: (_a = map.get(product.id)) !== null && _a !== void 0 ? _a : 0 };
    });
}
exports.createOrderedProductsList = createOrderedProductsList;
//# sourceMappingURL=utils.js.map