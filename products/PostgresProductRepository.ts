import  db from "../db/models"
import { IProductRepository } from "./IProductRepository"
import { Product , CreateProductType , UpdateProductType } from "./types"
import {removeNullOrUndefined} from "../utils/utils";
export class PostgresProductRepository implements IProductRepository{
    ProductConn = db.Product;
    constructor() {

    }

    public async getAllProducts({page,perPage}):Promise<Product[]>{
        page = page === undefined  || page === null ?  0 : page;
        perPage = perPage === undefined || perPage === null ? 10 : perPage
        const products = await this.ProductConn.findAll({
            limit:perPage,
            offset:(page*perPage),
        });
        return products;
    }

    public async createNewProduct(CreateProductType:CreateProductType):Promise<Product> {

        const product = await this.ProductConn.create(CreateProductType);
        return product;
    }
    public async getProduct(id:number):Promise<Product | null>{
        const product = await this.ProductConn.findByPk(id);
        return product;
    }
    public async deleteProduct(id: number): Promise<Product | null> {
        const product = await this.ProductConn.findByPk(id);
        product?.set({isDeleted:true})
        await product?.save();
        return product;
    }

    public async updateProduct(id: number, UpdateProductType: any): Promise<Product | null> {

        UpdateProductType = removeNullOrUndefined(UpdateProductType)
        const product = await this.ProductConn.findByPk(id);
        product?.set(UpdateProductType)
        await product?.save();
        return product;
    }

    public async getListOfProducts(arr: number[]): Promise<Product[]> {
        const products = await this.ProductConn.findAll({
            where:{
                id:arr,
                isDeleted:false
            }
        })
        return products;
    }

}
