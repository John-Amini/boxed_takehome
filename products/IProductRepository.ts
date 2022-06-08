import{ PostgresProductRepository }  from "./PostgresProductRepository"
import { Product , CreateProductType , UpdateProductType } from "./types"

export interface IProductRepository{
    getAllProducts({page,perPage}):Promise<Product[]>
    createNewProduct(CreateProductType): Promise<Product>
    getProduct(id:number):Promise<Product | null>
    deleteProduct(id:number):Promise<Product>
    updateProduct(id:number,UpdateProductType):Promise<Product>
}

export function getProductRepository() : IProductRepository {
    console.log(process.env.REPOSITORY)
    if(process.env.REPOSITORY === "POSTGRES") {
        return new PostgresProductRepository();
    }

    throw new Error("No Proper repository to use need proper env variable and repository")
}
