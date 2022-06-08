import { IProductRepository } from "./IProductRepository";
import { Product } from "./types";
export declare class PostgresProductRepository implements IProductRepository {
    ProductConn: any;
    constructor();
    getAllProducts({ page, perPage }: {
        page: any;
        perPage: any;
    }): Promise<Product[]>;
    createNewProduct(CreateProductType: any): Promise<Product>;
    getProduct(id: number): Promise<Product | null>;
    deleteProduct(id: number): Promise<Product>;
    updateProduct(id: number, UpdateProductType: any): Promise<Product>;
    private removeNullOrUndefined;
}
//# sourceMappingURL=PostgresProductRepository.d.ts.map