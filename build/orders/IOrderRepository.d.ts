import { Order, UpdateOrderType, OrderedProduct, ProductWithQuantity } from "./types";
export interface IOrderRepository {
    getAllOrders(select: string[] | undefined, { page, perPage }: {
        page: any;
        perPage: any;
    }): Promise<Order[]>;
    createNewOrder(CreateOrderType: any): Promise<Order>;
    getOrder(id: number, select: string[] | undefined): Promise<Order | null>;
    deleteOrder(id: number): Promise<Order | null>;
    updateOrder(id: number, updateOrder: UpdateOrderType): Promise<Order | null>;
    addProductsToOrder(id: number, products: ProductWithQuantity[]): Promise<OrderedProduct[]>;
}
export declare function getOrderRepository(): IOrderRepository;
//# sourceMappingURL=IOrderRepository.d.ts.map