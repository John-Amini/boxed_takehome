import { object, string, number, date, InferType } from 'yup';
export type Product = {
    id:number,
    name:string,
    salePrice:number,
    boughtPrice:number,
    imageURL:string,
    weight:number,
    description:string,
    isDeleted:boolean,
    createdAt:Date,
    updatedAt:Date
}

export const createProductInput = object({
    name: string().required(),
    salePrice: number().required().positive(),
    boughtPrice: number().required().positive(),
    imageURL: string().url(),
    weight: number().required().positive(),
    description: string(),

  });

  export type CreateProductType = InferType<typeof createProductInput>;
// export type CreateProductType = {
//     name:string,
//     salePrice:number,
//     boughtPrice:number,
//     imageURL?:string,
//     weight:number,
//     description?:string
// }

export const updateProductInput = object({
    name: string(),
    salePrice: number().positive(),
    boughtPrice: number().positive(),
    imageURL: string().url(),
    weight: number().positive(),
    description: string(),

  });

  export type UpdateProductType = InferType<typeof updateProductInput>;
// export type UpdateProductType = {
//     name?:string,
//     salePrice?:number,
//     boughtPrice?:number,
//     imageURL?:string,
//     weight?:number,
//     description?:string
// };
