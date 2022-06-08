import { InferType } from 'yup';
export declare type Order = {
    id: number;
    userId: number;
    shippingLocation: string;
    shippingCost: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type OrderedProduct = {
    id: number;
    orderId: number;
    productId: number;
    salePrice: number;
    boughtPrice: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare type OrderedProductType = {
    orderId: number;
    productId: number;
    salePrice: number;
    boughtPrice: number;
};
export declare const createOrderInput: import("yup/lib/object").OptionalObjectSchema<{
    userId: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    shippingLocation: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    products: import("yup/lib/array").RequiredArraySchema<import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>, import("yup/lib/types").AnyObject, (number | undefined)[] | undefined>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    userId: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    shippingLocation: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    products: import("yup/lib/array").RequiredArraySchema<import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>, import("yup/lib/types").AnyObject, (number | undefined)[] | undefined>;
}>>;
export declare type CreateOrderType = InferType<typeof createOrderInput>;
export declare const updateOrderInput: import("yup/lib/object").OptionalObjectSchema<{
    userId: import("yup").NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    shippingLocation: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    status: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    userId: import("yup").NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    shippingLocation: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    status: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
}>>;
export declare type UpdateOrderType = InferType<typeof updateOrderInput>;
//# sourceMappingURL=types.d.ts.map