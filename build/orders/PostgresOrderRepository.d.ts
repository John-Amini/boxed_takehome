import { Product } from "../products/types";
import { IOrderRepository } from "./IOrderRepository";
import { Order, OrderedProduct, UpdateOrderType } from "./types";
export declare class PostgresOrderRepository implements IOrderRepository {
    OrderConn: any;
    OrderProductConn: any;
    constructor();
    getAllOrders({ page, perPage }: {
        page: any;
        perPage: any;
    }): Promise<Order[]>;
    deleteOrder(id: number): Promise<Order | null>;
    createNewOrder(CreateOrderType: any): Promise<Order>;
    getOrder(id: number): Promise<Order | null>;
    updateOrder(id: number, orderUpdate: UpdateOrderType): Promise<Order | null>;
    addProductsToOrder(id: number, products: Product[]): Promise<OrderedProduct[]>;
    getProductsFromOrder(id: number): Promise<OrderedProduct[]>;
}
//# sourceMappingURL=PostgresOrderRepository.d.ts.map