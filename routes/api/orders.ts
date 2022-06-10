import express from "express"
import asyncHandler from "express-async-handler"
import { ValidationError } from "yup";
import { getOrderRepository } from "../../orders/IOrderRepository";
import {OrderService} from "../../orders/OrderService"
import { createOrderInput, CreateOrderType, ProductWithQuantity, updateOrderInput, UpdateOrderType } from "../../orders/types";
import { getProductRepository } from "../../products/IProductRepository";
import { ProductService } from "../../products/ProductService";
import { Product } from "../../products/types";
import { createOrderedProductsList , getErrorMessage } from "../../utils/utils";
export const router = express.Router();





router.post("/",asyncHandler (async (req:any,res:any) => {
    try{
        let service = new OrderService(getOrderRepository());

        let newOrderParameters : CreateOrderType = await createOrderInput.validate(req.body)
        let productIdsAndQuantity = req.body.products;

        let products = productIdsAndQuantity.map(x => x.id);
        let productService = new ProductService(getProductRepository());
        let productsArray = await  productService.getListOfProducts(products);
        if(productsArray === null || productsArray.length !== products.length){
            res.status(400);
            return res.json({"Error":`An item does not exist`})
        }
        let productListWithQuantities : ProductWithQuantity[] = createOrderedProductsList(productIdsAndQuantity,productsArray)
        let newOrder = await service.createOrder(newOrderParameters,productListWithQuantities);

        return res.json({newOrder})
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
    try{

        let service = new OrderService(getOrderRepository());
        let query = req.query;
        let select: string [] | undefined = query.select?.split(",")
        let order = await service.getOrder(req.params.id,select)

        if(order === null){

            res.status(400)
            return res.json({"Error":"Not Found"})
        }

        return res.json({order})
    }
    catch(err :any){
        res.status(500);
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
    }


}))

router.get("/",asyncHandler (async (req:any,res:any) => {

    try {
        let select: string [] | undefined = req.query.select?.split(",")

        let service = new OrderService(getOrderRepository());
        let orders = await service.getAllOrders(select,req.query);
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
