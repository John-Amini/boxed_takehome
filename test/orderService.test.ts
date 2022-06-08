import {OrderService} from "../orders/OrderService"
import { getOrderRepository } from "../orders/IOrderRepository";
import { CreateOrderType, Order,UpdateOrderType, OrderedProduct , OrderedProductType } from "../orders/types";
import {expect} from "chai"
import db from "../db/models"
import { ProductService } from "../products/ProductService";
import { getProductRepository } from "../products/IProductRepository";
import { Product } from "../products/types";


//arrange
//act
//assert

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
            "products":[product.id]
        }

        let productsList = await productService.getListOfProducts(newOrderParameters.products)
        let order = await orderService.createOrder(newOrderParameters);
            expect(productsList).to.not.be.eq(null)


        let orderedProducts = await orderService.addProductsToOrder(order.id,productsList);
        expect(order.userId).to.be.eq(newOrderParameters.userId)
        expect(order.shippingLocation).to.be.eq(newOrderParameters.shippingLocation);
        expect(orderedProducts[0].productId).to.be.eq(product.id);
        expect(orderedProducts[0].salePrice).to.be.eq(product.salePrice);
        expect(orderedProducts[0].boughtPrice).to.be.eq(product.boughtPrice);

        expect(orderedProducts[0].orderId).to.be.eq(order.id);

        // delete one thing
        // let productJustCreated = await db.Product.findByPk(product.id);
        // await productJustCreated.destroy();

    })

    it('should mark cancelled',async () => {
        let orderService = new OrderService(getOrderRepository());
        let productService = new ProductService(getProductRepository());
        let product = await makeProductForTest(productService)

        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[product.id]
        }

        let order = await orderService.createOrder(newOrderParameters);

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
            "products":[product.id]
        }

        let order = await orderService.createOrder(newOrderParameters);

        let updateParameters : UpdateOrderType = {
            "userId":null,
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
        let product = await makeProductForTest(productService)

        let newOrderParameters = {
            "userId":1,
            "shippingLocation":"South Plainfield, New Jersey",
            "products":[product.id]
        }

        let order = await orderService.createOrder(newOrderParameters);


        let orderRetrieved = await orderService.getOrder(order.id);
        let productsRetrieved = await orderService.getProductsFromOrder(order.id)
        expect(orderRetrieved).to.not.be.eq(null)
        expect(orderRetrieved?.id).to.be.eq(order.id)
        expect(orderRetrieved?.createdAt).to.be.eq(order.createdAt)
        expect(orderRetrieved?.status).to.be.eq(order.status)
        expect(orderRetrieved?.shippingCost).to.be.eq(order.shippingCost)
        expect(orderRetrieved?.shippingLocation).to.be.eq(order.shippingLocation)
        expect(orderRetrieved?.userId).to.be.eq(order.userId)

        expect(productsRetrieved).to.not.be.eq(null);
        expect(productsRetrieved[0].productId).to.be.eq(product.id)
        expect(productsRetrieved[0].orderId).to.be.eq(order.id)

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
