// import autoBind from "auto-bind"
import { Product } from "../products/types";
import { IOrderRepository } from "./IOrderRepository"
import {status, Order, CreateOrderType, UpdateOrderType, OrderedProduct, ProductWithQuantity } from "./types"

const shippingCost = 5.99
export class OrderService {

    constructor(private orderRepo : IOrderRepository){
        this.orderRepo = orderRepo
    }

    public async createOrder(newOrder:CreateOrderType,productAndQuantity:ProductWithQuantity[]):Promise<Order>{
        newOrder["status"] = "Pending"
        newOrder["shippingCost"] = shippingCost;
        newOrder["totalPrice"] = this.getTotalPrice(productAndQuantity,shippingCost)
        const order = await this.orderRepo.createNewOrder(newOrder);
        const productsOrdered = await this.orderRepo.addProductsToOrder(order.id,productAndQuantity)
        return this.getOrder(order.id,undefined) as Promise<Order>;
    }
    getTotalPrice(productAndQuantity: ProductWithQuantity[], shippingCost: number): number {
        let costOfProducts = productAndQuantity.reduce((sum,productAndQuantity) =>{
            return (productAndQuantity.product.salePrice * productAndQuantity.quantity) + sum;
        },0  )
        return costOfProducts + shippingCost
    }

    public async getOrder(id:number,select : string[] | undefined):Promise<Order | null>{
        const order = await this.orderRepo.getOrder(id,select);
        return order;
    }

    public async getAllOrders (select:string[] | undefined,pageInfo):Promise<Order[]>{
        const orders = await this.orderRepo.getAllOrders(select,pageInfo);
        return orders
    }

    public async deleteOrder(id:number):Promise<Order | null>{
        const checkIfExists = await this.orderRepo.getOrder(id,undefined);
        if(checkIfExists?.status === status.Cancelled){
            throw new Error("Order already completed")
        }

        const order = await this.orderRepo.deleteOrder(id);

        return order;
    }

    public async updateOrder(id:number,orderUpdate:UpdateOrderType):Promise<Order | null>{
        let orderToBeUpdated = await this.getOrder(id,undefined)
        if(orderToBeUpdated?.status === status.Cancelled || orderToBeUpdated?.status === status.Completed){
           throw new Error(`Order has already been ${orderToBeUpdated?.status}, cannot update`)
        }
        const order = await this.orderRepo.updateOrder(id,orderUpdate);

        return order;
    }



}
