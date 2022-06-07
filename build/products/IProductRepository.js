"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductRepository = void 0;
const PostgresProductRepository_1 = require("./PostgresProductRepository");
function getProductRepository() {
    console.log(process.env.REPOSITORY);
    if (process.env.REPOSITORY === "POSTGRES") {
        return new PostgresProductRepository_1.PostgresProductRepository();
    }
    throw new Error("No Proper repository to use need proper env variable and repository");
}
exports.getProductRepository = getProductRepository;
//# sourceMappingURL=IProductRepository.js.map