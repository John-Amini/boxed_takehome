import { IOrderRepository } from "./IOrderRepository";
import { Order, CreateOrderType, UpdateOrderType, ProductWithQuantity } from "./types";
export declare class OrderService {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    createOrder(newOrder: CreateOrderType, productAndQuantity: ProductWithQuantity[]): Promise<Order>;
    getTotalPrice(productAndQuantity: ProductWithQuantity[], shippingCost: number): number;
    getOrder(id: number, select: string[] | undefined): Promise<Order | null>;
    getAllOrders(select: string[] | undefined, pageInfo: any): Promise<Order[]>;
    deleteOrder(id: number): Promise<Order | null>;
    updateOrder(id: number, orderUpdate: UpdateOrderType): Promise<Order | null>;
}
//# sourceMappingURL=OrderService.d.ts.map