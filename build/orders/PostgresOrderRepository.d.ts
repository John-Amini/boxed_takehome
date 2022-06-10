import { IOrderRepository } from "./IOrderRepository";
import { Order, OrderedProduct, ProductWithQuantity, UpdateOrderType } from "./types";
export declare class PostgresOrderRepository implements IOrderRepository {
    OrderConn: any;
    OrderProductConn: any;
    constructor();
    getAllOrders(select: string[] | undefined, { page, perPage }: {
        page: number;
        perPage: number;
    }): Promise<Order[]>;
    deleteOrder(id: number): Promise<Order | null>;
    createNewOrder(CreateOrderType: any): Promise<Order>;
    getOrder(id: number, select: string[] | undefined): Promise<Order | null>;
    updateOrder(id: number, orderUpdate: UpdateOrderType): Promise<Order | null>;
    addProductsToOrder(id: number, products: ProductWithQuantity[]): Promise<OrderedProduct[]>;
}
//# sourceMappingURL=PostgresOrderRepository.d.ts.map