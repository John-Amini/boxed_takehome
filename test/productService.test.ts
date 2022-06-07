import { ProductService } from "../products/ProductService"
// const {ProductService} = require("./products/ProductService")
// const {getProductRepository} = require("./products/IProductRepository")
import { getProductRepository } from "../products/IProductRepository"
import { CreateProductType } from "../products/types";
import {expect} from "chai"

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
        let product = await service.createProduct(newProductParameters)
        expect(product.name).to.be.eq(newProductParameters.name)
        expect(product.salePrice).to.be.eq(newProductParameters.salePrice)
        expect(product.boughtPrice).to.be.eq(newProductParameters.boughtPrice)
        expect(product.imageURL).to.be.eq(null)
        expect(product.weight).to.be.eq(newProductParameters.weight)
        expect(product.description).to.be.eq(newProductParameters.description)
    })
})
