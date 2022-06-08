import  db from "../db/models"
import { IProductRepository } from "./IProductRepository"
import { Product , CreateProductType , UpdateProductType } from "./types"

export class PostgresProductRepository implements IProductRepository{
    ProductConn = db.Product;
    constructor() {

    }

    public async getAllProducts({page,perPage}):Promise<Product[]>{
        //sequelize uses updatedAt in order to sort for pagination with the least recent being page 1
        page = page === undefined  || page === null ?  0 : page;
        perPage = perPage === undefined || perPage === null ? 1 : perPage
        const products = await this.ProductConn.findAll({
            limit:perPage,
            offset:(page*perPage),
        });
        return products;
    }

    public async createNewProduct(CreateProductType):Promise<Product> {
        CreateProductType["isDeleted"] = false
        const product = await this.ProductConn.create(CreateProductType);
        return product;
    }
    public async getProduct(id:number):Promise<Product | null>{
        const product = await this.ProductConn.findByPk(id);
        return product;
    }
    public async deleteProduct(id: number): Promise<Product> {
        const product = await this.ProductConn.findByPk(id);
        product.set({isDeleted:true})
        await product.save();
        return product;
    }

    public async updateProduct(id: number, UpdateProductType: any): Promise<Product> {

        UpdateProductType = this.removeNullOrUndefined(UpdateProductType)
        const product = await this.ProductConn.findByPk(id);
        product.set(UpdateProductType)
        await product.save();
        return product;
    }

    private removeNullOrUndefined(updateProduct){
        for (const key in updateProduct) {
            if (updateProduct[key] === null || updateProduct[key] === undefined) {
              delete updateProduct[key];
            }
          }
          return updateProduct
    }
}
