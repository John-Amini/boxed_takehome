import { object, string, number, date, InferType, array } from 'yup';
import { Product } from '../products/types';

export type Order = {
    id:number,
    userId:number,
    shippingLocation:string,
    shippingCost:number,
    status:string,
    createdAt:Date,
    updatedAt:Date
}

export type OrderedProduct= {
    id:number
    orderId:number,
    productId:number,
    salePrice:number,
    boughtPrice:number,
    quantity:number,
    createdAt:Date,
    updatedAt:Date
}

export type ProductWithQuantity = {
    product:Product,
    quantity:number | undefined
}
export type OrderedProductType= {
    orderId:number,
    productId:number,
    salePrice:number,
    boughtPrice:number,
    quantity:number | undefined,
}

export const createOrderInput = object ( {
    userId:number().required().positive(),
    shippingLocation:string().required(),
    // products:array().of(number().required()).required().min(1,"No Products"),
    products:array().of(object({id:number().required(), quantity: number().required()})).required().min(1,"No Products"),

})

export type CreateOrderType = InferType<typeof createOrderInput>
//look into making status an enumerable instead of a string for type here
export const updateOrderInput = object ( {
    userId:number(),
    shippingLocation:string(),
    status:string(),

})

export type UpdateOrderType = InferType<typeof updateOrderInput>
