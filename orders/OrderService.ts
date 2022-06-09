// import autoBind from "auto-bind"
import { Product } from "../products/types";
import { IOrderRepository } from "./IOrderRepository"
import { Order, CreateOrderType, UpdateOrderType, OrderedProduct, ProductWithQuantity } from "./types"

export class OrderService {
    constructor(private orderRepo : IOrderRepository){
        this.orderRepo = orderRepo
    }

    public async createOrder(newOrder:CreateOrderType):Promise<Order>{
        const order = await this.orderRepo.createNewOrder(newOrder);
        return order;
    }

    public async getOrder(id:number):Promise<Order | null>{
        const order = await this.orderRepo.getOrder(id)
        return order;
    }

    public async getAllOrders (pageInfo):Promise<Order[]>{
        const orders = await this.orderRepo.getAllOrders(pageInfo);
        return orders
    }

    public async deleteOrder(id:number):Promise<Order | null>{
        const order = await this.orderRepo.deleteOrder(id);
        return order;
    }

    public async updateOrder(id:number,orderUpdate:UpdateOrderType):Promise<Order | null>{
        const order = await this.orderRepo.updateOrder(id,orderUpdate);
        return order;
    }

    public async addProductsToOrder(id:number,products : ProductWithQuantity[]):Promise<OrderedProduct[]>{
        const productsOrdered = await this.orderRepo.addProductsToOrder(id,products);
        return productsOrdered;
    }

    public async getProductsFromOrder(id:number):Promise<OrderedProduct[]>{
        const productsOrdered = await this.orderRepo.getProductsFromOrder(id);
        return productsOrdered;
    }
}
