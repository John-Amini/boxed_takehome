import db from "../db/models"
import product from "../db/models/product";
import { Product } from "../products/types";
import {removeNullOrUndefined}from "../utils/utils";
import {IOrderRepository} from "./IOrderRepository"
import { Order, OrderedProduct, OrderedProductType, ProductWithQuantity, UpdateOrderType } from "./types"

export class PostgresOrderRepository implements IOrderRepository {
    OrderConn = db.Order;
    OrderProductConn = db.OrderProduct
    constructor(){



    }

   public async getAllOrders({ page, perPage }: { page: any; perPage: any; }): Promise<Order[]> {
    page = page === undefined  || page === null ?  0 : page;
    perPage = perPage === undefined || perPage === null ? 10 : perPage
    const orders = await this.OrderConn.findAll({
        limit:perPage,
        offset:(page*perPage),
    });
    return orders;
    }

    public async deleteOrder(id: number): Promise<Order | null> {
        const order = await this.OrderConn.findByPk(id);
        if(order.status === "Completed"){
            //cant cancel an order that is completed
            return null;
        }
        order?.set({status:"Cancelled"})
        await order?.save();
        return order;
    }

    public async createNewOrder(CreateOrderType: any): Promise<Order> {
        CreateOrderType["status"] = "Pending"
        CreateOrderType["shippingCost"] = 4.99;
        const order = await this.OrderConn.create(CreateOrderType);
        return order
    }

    public async getOrder(id: number): Promise<Order | null> {
        const order = await this.OrderConn.findByPk(id);
        return order;
    }

    public async updateOrder(id: number, orderUpdate:UpdateOrderType): Promise<Order | null> {
        orderUpdate = removeNullOrUndefined(orderUpdate);
        const order = await this.OrderConn.findByPk(id);
        if(order.status !== "Pending"){
            //cant update an order thats been canceled or completed
            return null;
        }
        order?.set(orderUpdate);
        await order?.save();
        return order;
    }


public async addProductsToOrder(id: number, products: ProductWithQuantity[]) {
    let orders : OrderedProduct [] = []
    let arrForBulkCreate : OrderedProductType []= []
    for(let productAndQuantity of products){
        let orderedParameters : OrderedProductType = {
            orderId:id,
            productId:productAndQuantity.product.id,
            salePrice:productAndQuantity.product.salePrice,
            boughtPrice:productAndQuantity.product.boughtPrice,
            quantity:productAndQuantity.quantity
        }
        arrForBulkCreate.push(orderedParameters)
    }

    orders = await this.OrderProductConn.bulkCreate(arrForBulkCreate);
    return orders;
}

public async getProductsFromOrder(id:number){
    let products : OrderedProduct[] = []

    products = await this.OrderProductConn.findAll({where:{orderId:id}})
    return products;
}

}
