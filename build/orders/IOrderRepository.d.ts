import { Product } from "../products/types";
import { Order, UpdateOrderType, OrderedProduct } from "./types";
export interface IOrderRepository {
    getAllOrders({ page, perPage }: {
        page: any;
        perPage: any;
    }): Promise<Order[]>;
    createNewOrder(CreateOrderType: any): Promise<Order>;
    getOrder(id: number): Promise<Order | null>;
    deleteOrder(id: number): Promise<Order | null>;
    updateOrder(id: number, updateOrder: UpdateOrderType): Promise<Order | null>;
    addProductsToOrder(id: number, products: Product[]): Promise<OrderedProduct[]>;
    getProductsFromOrder(id: number): Promise<OrderedProduct[]>;
}
export declare function getOrderRepository(): IOrderRepository;
//# sourceMappingURL=IOrderRepository.d.ts.map