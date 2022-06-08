import express from "express"
import asyncHandler from "express-async-handler"
import { ValidationError } from "yup";
import { getProductRepository } from "../../products/IProductRepository";
import { ProductService } from "../../products/ProductService";
import { CreateProductType, UpdateProductType , createProductInput, updateProductInput } from "../../products/types";
export const router = express.Router();


function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

//fix error handlers - DONE
//fix pagination on get all products -DONE
//add tests for these things
//figure out how to delete the table fully


router.get('/:id',asyncHandler(async (req : any, res:any) => {
    //error handler good here
    try{
        // "/api/products/9"
        let service = new ProductService(getProductRepository());
        let product = await service.getProduct(req.params.id)
        if(product === null){
            res.status(400)
            return res.json({"Error":"Not Found"})
        }
        return res.json(product)
    }
    catch(err :any){
        res.status(500);
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
    }
}))

router.get('/',asyncHandler(async (req:any,res:any) => {
   try {
       //should be good for errors here
       //need to figure how to paginate all the products here
       //skip is page * perPage
       //limit is perPage
       let service = new ProductService(getProductRepository());
       let products = await service.getAllProducts(req.query);
       return res.json(products)
   } catch(err){
        res.status(500);
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
}
}))

router.post('/',asyncHandler(async (req : any,res : any) => {
    try{
    let service = new ProductService(getProductRepository());

    let newProductParameters :CreateProductType = await createProductInput.validate(req.body)
    let newProduct = await service.createProduct(newProductParameters)
    return res.json({newProduct})
    }
    catch (err){
        if(err instanceof ValidationError){
            res.status(400);
        } else{
            res.status(500)
        }
        let errorMessage = getErrorMessage(err)
        return res.json({"Error":errorMessage})
    }
}))

router.delete('/:id',asyncHandler(async (req:any,res:any) => {
    try{
        let service = new ProductService(getProductRepository());
        let markedForDeletedProduct = await service.deleteProduct(req.params.id)
        if(markedForDeletedProduct === null){
            res.status(400)
            return res.json({"Error":"Not Found"})
        }
        return res.json({markedForDeletedProduct})
    }
    catch(err){
        res.status(500)
        let errorMessage = getErrorMessage(err);
        return res.json({"Error":errorMessage})
    }
}))

router.put('/:id',asyncHandler(async (req:any,res:any) => {
    try{
    let service = new ProductService(getProductRepository());
    let updatedProductParameters :UpdateProductType = await updateProductInput.validate(req.body)

    let updatedProduct = await service.updateProduct(req.params.id,updatedProductParameters)

    if(updatedProduct === null){
        res.status(400)
        return res.json({"Error":"Not Found"})
    }
    return res.json({updatedProduct})
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
