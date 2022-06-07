// import autoBind from "auto-bind"
import { IProductRepository } from "./IProductRepository"
import { CreateProductType, Product, UpdateProductType } from "./types"

export class ProductService {
    constructor(private productRepo : IProductRepository){
        this.productRepo = productRepo
    }

    public async createProduct(newProduct:CreateProductType): Promise<Product>{
        const product = await this.productRepo.createNewProduct(newProduct)
        return product
    }

    public async getProduct(id:number):Promise<Product | null> {
        const product = await this.productRepo.getProduct(id);
        return product
    }

    public async getAllProducts(): Promise<Product[]>{
        const products = await this.productRepo.getAllProducts();
        return products;
    }

    public async deleteProduct(id:number):Promise<Product> {
        const product = await this.productRepo.deleteProduct(id);
        return product
    }
    public async updateProduct(id:number,productUpdate:UpdateProductType):Promise<Product>{
        const product = await this.productRepo.updateProduct(id,productUpdate);
        return product;
    }
}
