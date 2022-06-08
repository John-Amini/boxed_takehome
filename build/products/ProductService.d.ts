import { IProductRepository } from "./IProductRepository";
import { CreateProductType, Product, UpdateProductType } from "./types";
export declare class ProductService {
    private productRepo;
    constructor(productRepo: IProductRepository);
    createProduct(newProduct: CreateProductType): Promise<Product>;
    getProduct(id: number): Promise<Product | null>;
    getAllProducts(pageInfo: any): Promise<Product[]>;
    deleteProduct(id: number): Promise<Product | null>;
    updateProduct(id: number, productUpdate: UpdateProductType): Promise<Product | null>;
    getListOfProducts(arr: number[]): Promise<Product[]>;
}
//# sourceMappingURL=ProductService.d.ts.map