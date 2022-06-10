import {OrderService} from "../orders/OrderService"
import { getOrderRepository } from "../orders/IOrderRepository";
import { UpdateOrderType } from "../orders/types";
import {expect} from "chai"
import db from "../db/models"
import { ProductService } from "../products/ProductService";
import { getProductRepository } from "../products/IProductRepository";
import { Product } from "../products/types";
import { createOrderedProductsList } from "../utils/utils";

describe('OrderService', () => {
    afterEach(async () =>{
        await db.Product.destroy({
            where:{},
            cascade:true,
            truncate:true
        })
        await db.Order.destroy({
            where:{},
            cascade:true,
            truncate:true
        })
        await db.OrderProduct.destroy({
            where:{},
            cascade:true,
            truncate:true
        })
    })
    it('should create', async () => {
        let orderService = new OrderService(getOrderRepository());
        let productService = new ProductService(getProductRepository());
        let product = await makeProductForTest(productService);
        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[{id:product.id , quantity:3}]
        }

        let productsList = await productService.getListOfProducts([product.id])
        let list = createOrderedProductsList([{id: product.id, quantity:2}],productsList);

        let order = await orderService.createOrder(newOrderParameters,list);
        expect(productsList).to.not.be.eq(null)
        expect(order).to.not.be.eq(null)
        expect(order?.userId).to.be.eq(newOrderParameters.userId)
        expect(order?.shippingLocation).to.be.eq(newOrderParameters.shippingLocation);
        expect(order?.OrderProducts[0]?.productId).to.be.eq(product.id);
        expect(order?.OrderProducts[0]?.salePrice).to.be.eq(product.salePrice);
        expect(order?.OrderProducts[0]?.boughtPrice).to.be.eq(product.boughtPrice);

        expect(order.OrderProducts[0].orderId).to.be.eq(order.id);


    })

    it('should mark cancelled',async () => {
        let orderService = new OrderService(getOrderRepository());
        let productService = new ProductService(getProductRepository());
        let product = await makeProductForTest(productService)

        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[{id:product.id , quantity:3}]
        }
        let productsList = await productService.getListOfProducts([product.id])
        let list = createOrderedProductsList([{id: product.id, quantity:2}],productsList);
        let order = await orderService.createOrder(newOrderParameters,list);

        let cancelledOrder = await orderService.deleteOrder(order.id);
        expect(cancelledOrder).to.be.not.eq(null)
        expect(cancelledOrder?.status).to.be.eq("Cancelled");

    })

    it("should update the order", async () => {
        let orderService = new OrderService(getOrderRepository());
        let productService = new ProductService(getProductRepository());
        let product = await makeProductForTest(productService)

        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[{id:product.id , quantity:3}]

        }
        let productsList = await productService.getListOfProducts([product.id])
        let list = createOrderedProductsList([{id: product.id, quantity:2}],productsList);
        let order = await orderService.createOrder(newOrderParameters,list);

        let updateParameters : UpdateOrderType = {
            "userId":undefined,
            "shippingLocation":"Plainfield, New Jersey",
            "status":"Completed"
        }

        let updatedOrder = await orderService.updateOrder(order.id,updateParameters);

        expect(updatedOrder).to.not.be.eq(null)
        expect(updatedOrder?.shippingLocation).to.be.eq(updateParameters.shippingLocation);
        expect(updatedOrder?.status).to.be.eq(updateParameters.status);

    })

    it("should get the order" , async () => {
        let orderService = new OrderService(getOrderRepository());
        let productService = new ProductService(getProductRepository());
        let product = await makeProductForTest(productService);
        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[{id:product.id , quantity:3}]
        }

        let productsList = await productService.getListOfProducts([product.id])
        let list = createOrderedProductsList([{id: product.id, quantity:2}],productsList);

        let order = await orderService.createOrder(newOrderParameters,list);
            expect(productsList).to.not.be.eq(null)



        let orderRetrieved = await orderService.getOrder(order.id,undefined);

        expect(orderRetrieved).to.not.be.eq(null)
        expect(orderRetrieved?.id).to.be.eq(order.id)
        expect(orderRetrieved?.status).to.be.eq(order.status)
        expect(orderRetrieved?.shippingCost).to.be.eq(order.shippingCost)
        expect(orderRetrieved?.shippingLocation).to.be.eq(order.shippingLocation)
        expect(orderRetrieved?.userId).to.be.eq(order.userId)

        expect(orderRetrieved?.OrderProducts).to.not.be.eq(null);
        expect(orderRetrieved?.OrderProducts[0]?.productId).to.be.eq(product.id)
        expect(orderRetrieved?.OrderProducts[0]?.orderId).to.be.eq(order.id)

    })

})

async function makeProductForTest(service : ProductService):Promise<Product>{
    let newProductParameters = {
        name: "apples",
        salePrice: 10,
        boughtPrice: 5,
        imageURL: undefined,
        weight: 1,
        description: "Red apples from the Himalayas"
    }
    let product = await service.createProduct(newProductParameters);
    return product
}
