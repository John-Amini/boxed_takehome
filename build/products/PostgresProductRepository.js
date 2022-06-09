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
const utils_1 = require("../utils/utils");
class PostgresProductRepository {
    constructor() {
        this.ProductConn = models_1.default.Product;
    }
    getAllProducts({ page, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            //sequelize uses updatedAt in order to sort for pagination with the least recent being page 1
            page = page === undefined || page === null ? 0 : page;
            perPage = perPage === undefined || perPage === null ? 10 : perPage;
            const products = yield this.ProductConn.findAll({
                limit: perPage,
                offset: (page * perPage),
            });
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
            product === null || product === void 0 ? void 0 : product.set({ isDeleted: true });
            yield (product === null || product === void 0 ? void 0 : product.save());
            return product;
        });
    }
    updateProduct(id, UpdateProductType) {
        return __awaiter(this, void 0, void 0, function* () {
            UpdateProductType = (0, utils_1.removeNullOrUndefined)(UpdateProductType);
            const product = yield this.ProductConn.findByPk(id);
            product === null || product === void 0 ? void 0 : product.set(UpdateProductType);
            yield (product === null || product === void 0 ? void 0 : product.save());
            return product;
        });
    }
    getListOfProducts(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.ProductConn.findAll({
                where: {
                    id: arr,
                    isDeleted: false
                }
            });
            return products;
        });
    }
}
exports.PostgresProductRepository = PostgresProductRepository;
//# sourceMappingURL=PostgresProductRepository.js.map