import { IProductRepository } from "./IProductRepository"
import { CreateProductType, Product, UpdateProductType } from "./types"

export class ProductService {
    constructor(private productRepo : IProductRepository){
        this.productRepo = productRepo
    }

    public async createProduct(newProduct:CreateProductType): Promise<Product>{
        newProduct["isDeleted"] = false;
        const product = await this.productRepo.createNewProduct(newProduct)
        return product
    }

    public async getProduct(id:number):Promise<Product | null> {
        const product = await this.productRepo.getProduct(id);
        return product
    }

    public async getAllProducts(pageInfo): Promise<Product[]>{
        const products = await this.productRepo.getAllProducts(pageInfo);
        return products;
    }

    public async deleteProduct(id:number):Promise<Product | null> {
        const product = await this.productRepo.deleteProduct(id);
        return product
    }
    public async updateProduct(id:number,productUpdate:UpdateProductType):Promise<Product | null>{
        const product = await this.productRepo.updateProduct(id,productUpdate);
        return product;
    }

    public async getListOfProducts(arr:number[]):Promise<Product[]>{
        const products = await this.productRepo.getListOfProducts(arr);
        return products;
    }

}
