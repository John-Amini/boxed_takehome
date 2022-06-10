import { Product } from "../products/types";
import { PostgresOrderRepository } from "./PostgresOrderRepository";
import { Order, CreateOrderType, UpdateOrderType, OrderedProduct, ProductWithQuantity } from "./types";

export interface IOrderRepository {
    getAllOrders(select:string[] | undefined,{page,perPage}) : Promise<Order[]>
    createNewOrder(CreateOrderType):Promise<Order>
    getOrder(id:number,select:string[] | undefined):Promise<Order | null>
    deleteOrder(id:number):Promise<Order | null>
    updateOrder(id:number,updateOrder:UpdateOrderType):Promise<Order | null>
    addProductsToOrder(id:number,products:ProductWithQuantity[]):Promise<OrderedProduct[]>;
}

export function getOrderRepository () : IOrderRepository {
    if(process.env.REPOSITORY === "POSTGRES"){
        return new PostgresOrderRepository();
    }


    throw new Error("No Proper repository to use need proper env variable and repository")

}
