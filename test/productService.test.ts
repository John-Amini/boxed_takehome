import { ProductService } from "../products/ProductService"
// const {ProductService} = require("./products/ProductService")
// const {getProductRepository} = require("./products/IProductRepository")
import { getProductRepository } from "../products/IProductRepository"
import { CreateProductType, Product, UpdateProductType } from "../products/types";
import {expect} from "chai"
import db from "../db/models"

// test('adds 1 + 2 to equal 3', () => {
//     expect(3).toBe(3);
//   });

//   test('Create new product', async () =>  {
//     let service = new ProductService(getProductRepository());
//     let newProductParameters= {
//         name: "apples",
//         salePrice: 10,
//         boughtPrice: 5,
//         imageURL: null,
//         weight: 1,
//         description: "Red apples from the Himalayas"
//     }
//     let product = await service.createProduct(newProductParameters)
//     expect(product.name).toBe(newProductParameters.name)
//     expect(product.salePrice).toBe(newProductParameters.salePrice)
//     expect(product.boughtPrice).toBe(newProductParameters.boughtPrice)
//     expect(product.imageURL).toBe(newProductParameters.imageURL)
//     expect(product.weight).toBe(newProductParameters.weight)
//     expect(product.description).toBe(newProductParameters.description)

// });

//arrange
//act
//assert

describe('ProductService', () => {
    afterEach(async () =>{
        await db.Product.destroy({
            where:{},
            truncate:true
        })

    })
    it('should create', async () => {
        let service = new ProductService(getProductRepository());
        let newProductParameters = {
            name: "apples",
            salePrice: 10,
            boughtPrice: 5,
            imageURL: undefined,
            weight: 1,
            description: "Red apples from the Himalayas"
        }
        // let product = await service.createProduct(newProductParameters)
        let product = await makeProductForTest(service);
        expect(product.name).to.be.eq(newProductParameters.name)
        expect(product.salePrice).to.be.eq(newProductParameters.salePrice)
        expect(product.boughtPrice).to.be.eq(newProductParameters.boughtPrice)
        expect(product.imageURL).to.be.eq(null)
        expect(product.weight).to.be.eq(newProductParameters.weight)
        expect(product.description).to.be.eq(newProductParameters.description)
        // delete one thing
        // let productJustCreated = await db.Product.findByPk(product.id);
        // await productJustCreated.destroy();

    })

    it('should get specific' , async () => {
        let service = new ProductService(getProductRepository());
        let product = await makeProductForTest(service);
        let gotProduct = await service.getProduct(product.id)

        expect(product.name).to.be.eq(gotProduct?.name)
        expect(product.salePrice).to.be.eq(gotProduct?.salePrice)
        expect(product.boughtPrice).to.be.eq(gotProduct?.boughtPrice)
        expect(product.imageURL).to.be.eq(gotProduct?.imageURL)
        expect(product.weight).to.be.eq(gotProduct?.weight)
        expect(product.description).to.be.eq(gotProduct?.description)
        expect(product.id).to.be.eq(gotProduct?.id);

    })

    it('should mark for delete' , async () => {
        let service = new ProductService(getProductRepository());
        let product = await makeProductForTest(service);
        let markedForDeletedProduct = await service.deleteProduct(product.id);
        expect(product.id).to.be.eq(markedForDeletedProduct.id);
        expect(markedForDeletedProduct.isDeleted).to.be.eq(true);



    })


    it('should update some info' , async () => {
        let service = new ProductService(getProductRepository());
        let product = await makeProductForTest(service);
        let updateProductParameters : UpdateProductType= {
            name:"bananas",
            salePrice:undefined,
            boughtPrice:undefined,
            weight:undefined,
            description:"Bananas that are yellow",
            imageURL:"https://media.istockphoto.com/photos/banana-bunch-picture-id173242750?s=612x612"
        }
        let updatedProduct = await service.updateProduct(product.id,updateProductParameters)

        expect(updatedProduct.id).to.be.eq(product.id)
        expect(updatedProduct.name).to.be.eq(updateProductParameters.name)
        expect(updatedProduct.salePrice).to.be.eq(product.salePrice)
        expect(updatedProduct.boughtPrice).to.be.eq(product.boughtPrice)
        expect(updatedProduct.weight).to.be.eq(product.weight)
        expect(updatedProduct.description).to.be.eq(updateProductParameters.description);
        expect(updatedProduct.imageURL).to.be.eq(updateProductParameters.imageURL)



    })

    it('should get All' , async () => {
        let service = new ProductService(getProductRepository());
        let product = await makeProductForTest(service);
        let productTwo = await makeProductForTest(service)

        let products = await service.getAllProducts({page:0,perPage:2});

        expect(products[0].id).to.be.eq(product.id);
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
