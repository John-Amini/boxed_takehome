import express from "express"
import asyncHandler from "express-async-handler"
import { ValidationError } from "yup";
import { getOrderRepository } from "../../orders/IOrderRepository";
import {OrderService} from "../../orders/OrderService"
import { createOrderInput, CreateOrderType, updateOrderInput, UpdateOrderType } from "../../orders/types";
import { getProductRepository } from "../../products/IProductRepository";
import { ProductService } from "../../products/ProductService";
import { Product } from "../../products/types";
export const router = express.Router();


function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

router.post("/",asyncHandler (async (req:any,res:any) => {
    //create new order
    try{
        let service = new OrderService(getOrderRepository());
        let newOrderParameters : CreateOrderType = await createOrderInput.validate(req.body)
        let products = req.body.products;
        let productService = new ProductService(getProductRepository());
        let productsArray = await  productService.getListOfProducts(products);
        if(productsArray === null || productsArray.length !== products.length){
            res.status(400);
            return res.json({"Error":`An item does not exist`})
        }
        let newOrder = await service.createOrder(newOrderParameters);
        let orderedProducts = await service.addProductsToOrder(newOrder.id,productsArray);



        return res.json({newOrder,orderedProducts})
    }
    catch(err){
        if(err instanceof ValidationError){
            res.status(400);
        } else{
            res.status(500)
        }
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
    }
  }))

router.get("/:id",asyncHandler (async (req:any,res:any) => {
    //get one order
    try{

        let service = new OrderService(getOrderRepository());
        let order = await service.getOrder(req.params.id)

        if(order === null){

            res.status(400)
            return res.json({"Error":"Not Found"})
        }
        let productsOrdered = await service.getProductsFromOrder(order.id);

        return res.json({order,productsOrdered})
    }
    catch(err :any){
        res.status(500);
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
    }


}))

router.get("/",asyncHandler (async (req:any,res:any) => {
    //get all orders

    try {

        let service = new OrderService(getOrderRepository());
        let orders = await service.getAllOrders(req.query);
        return res.json(orders)
    } catch(err){
         res.status(500);
         let errorMessage = getErrorMessage(err)
         return res.json({"Error":errorMessage})
 }

}))


router.delete("/:id",asyncHandler (async (req:any,res:any) => {
    try{
        let service = new OrderService(getOrderRepository());
        console.log(req.params.id)
        let canceledOrder = await service.deleteOrder(req.params.id)
        if(canceledOrder === null){
            res.status(400)
            return res.json({"Error":"Not Found"})
        }
        return res.json({canceledOrder})
    }
    catch(err){
        res.status(500)
        let errorMessage = getErrorMessage(err);
        return res.json({"Error":errorMessage})
    }

}))


router.put("/:id",asyncHandler (async (req:any,res:any) => {
    //update order
    try{
        let service = new OrderService(getOrderRepository());
        let updatedOrderParameters :UpdateOrderType = await updateOrderInput.validate(req.body)

        let updatedOrder = await service.updateOrder(req.params.id,updatedOrderParameters)

        if(updatedOrder === null){
            res.status(400)
            return res.json({"Error":"Not Found"})
        }
        return res.json({updatedOrder})
    }
        catch(err){
            if(err instanceof ValidationError){
                res.status(400);
            } else{
                res.status(500)
            }
            let errorMessage = getErrorMessage(err);
            return res.json({"Error":errorMessage});
        }
}))


export default router;
