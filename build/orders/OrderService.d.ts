import { IOrderRepository } from "./IOrderRepository";
import { Order, CreateOrderType, UpdateOrderType, OrderedProduct, ProductWithQuantity } from "./types";
export declare class OrderService {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    createOrder(newOrder: CreateOrderType): Promise<Order>;
    getOrder(id: number): Promise<Order | null>;
    getAllOrders(pageInfo: any): Promise<Order[]>;
    deleteOrder(id: number): Promise<Order | null>;
    updateOrder(id: number, orderUpdate: UpdateOrderType): Promise<Order | null>;
    addProductsToOrder(id: number, products: ProductWithQuantity[]): Promise<OrderedProduct[]>;
    getProductsFromOrder(id: number): Promise<OrderedProduct[]>;
}
//# sourceMappingURL=OrderService.d.ts.map