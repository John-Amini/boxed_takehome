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
exports.PostgresProductRepository = void 0;
const models_1 = __importDefault(require("../db/models"));
class PostgresProductRepository {
    constructor() {
        this.ProductConn = models_1.default.Product;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            //need to figure how to paginate all the products here
            const products = yield this.ProductConn.findAll();
            return products;
        });
    }
    createNewProduct(CreateProductType) {
        return __awaiter(this, void 0, void 0, function* () {
            CreateProductType["isDeleted"] = false;
            const product = yield this.ProductConn.create(CreateProductType);
            return product;
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.ProductConn.findByPk(id);
            return product;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.ProductConn.findByPk(id);
            product.set({ isDeleted: true });
            yield product.save();
            return product;
        });
    }
    updateProduct(id, UpdateProductType) {
        return __awaiter(this, void 0, void 0, function* () {
            UpdateProductType = this.removeNullOrUndefined(UpdateProductType);
            const product = yield this.ProductConn.findByPk(id);
            product.set(UpdateProductType);
            yield product.save();
            return product;
        });
    }
    removeNullOrUndefined(updateProduct) {
        for (const key in updateProduct) {
            if (updateProduct[key] === null || updateProduct[key] === undefined) {
                delete updateProduct[key];
            }
        }
        return updateProduct;
    }
}
exports.PostgresProductRepository = PostgresProductRepository;
//# sourceMappingURL=PostgresProductRepository.js.map