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
exports.ProductService = void 0;
class ProductService {
    constructor(productRepo) {
        this.productRepo = productRepo;
        this.productRepo = productRepo;
    }
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.createNewProduct(newProduct);
            return product;
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.getProduct(id);
            return product;
        });
    }
    getAllProducts(pageInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepo.getAllProducts(pageInfo);
            return products;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.deleteProduct(id);
            return product;
        });
    }
    updateProduct(id, productUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.updateProduct(id, productUpdate);
            return product;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map