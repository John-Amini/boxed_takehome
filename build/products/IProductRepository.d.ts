import { Product } from "./types";
export interface IProductRepository {
    getAllProducts(): Promise<Product[]>;
    createNewProduct(CreateProductType: any): Promise<Product>;
    getProduct(id: number): Promise<Product | null>;
    deleteProduct(id: number): Promise<Product>;
    updateProduct(id: number, UpdateProductType: any): Promise<Product>;
}
export declare function getProductRepository(): IProductRepository;
//# sourceMappingURL=IProductRepository.d.ts.map