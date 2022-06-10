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

   public async getAllOrders(select:string[] | undefined,{ page, perPage }: { page: number; perPage: number; }): Promise<Order[]> {
    page = page === undefined  || page === null ?  0 : page;
    perPage = perPage === undefined || perPage === null ? 10 : perPage

   if (select === undefined) {
       const orders = await this.OrderConn.findAll({
           limit:perPage,
           offset:(page&perPage),
           include:{model:db.OrderProduct}
       })
       return orders
   } else if(select.includes("OrderProduct")){
    const filterSelect = select.filter(x => x!=="OrderProduct");
    const orders = await this.OrderConn.findAll({
        attributes:filterSelect,
        include:{model:db.OrderProduct}
    })
    return orders
   } else{
    const orders = await this.OrderConn.findAll({
        limit:perPage,
        offset:(page*perPage),
        attributes:select
    });
    return orders
   }

    }

    public async deleteOrder(id: number): Promise<Order | null> {
        const order = await this.OrderConn.findByPk(id);
        order?.set({status:"Cancelled"})
        await order?.save();
        return order;
    }

    public async createNewOrder(CreateOrderType: any): Promise<Order> {

        const order = await this.OrderConn.create(CreateOrderType);
        return order
    }

    public async getOrder(id: number , select :string[] | undefined): Promise<Order | null> {
       if(select === undefined){
        const order = await this.OrderConn.findByPk(id, {include:{model:db.OrderProduct}})
        return order;
    } else if(select.includes("OrderProduct")){
        const filterSelect= select.filter(x => x !== "OrderProduct")
        const order = await this.OrderConn.findByPk(id,{attributes:filterSelect,include:{model:db.OrderProduct}})
        return order;
    }
    else{
        const order = await this.OrderConn.findByPk(id,{attributes:select})
        return order;
    }
    }

    public async updateOrder(id: number, orderUpdate:UpdateOrderType): Promise<Order | null> {
        orderUpdate = removeNullOrUndefined(orderUpdate);
        const order = await this.OrderConn.findByPk(id);

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

}
