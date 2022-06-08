"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderRepository = void 0;
const PostgresOrderRepository_1 = require("./PostgresOrderRepository");
function getOrderRepository() {
    if (process.env.REPOSITORY === "POSTGRES") {
        return new PostgresOrderRepository_1.PostgresOrderRepository();
    }
    throw new Error("No Proper repository to use need proper env variable and repository");
}
exports.getOrderRepository = getOrderRepository;
//# sourceMappingURL=IOrderRepository.js.map