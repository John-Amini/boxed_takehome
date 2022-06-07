import { InferType } from 'yup';
export declare type Product = {
    id: number;
    name: string;
    salePrice: number;
    boughtPrice: number;
    imageURL: string;
    weight: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const createProductInput: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    salePrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    boughtPrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    imageURL: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    weight: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    description: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    salePrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    boughtPrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    imageURL: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    weight: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    description: import("yup").StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
}>>;
export declare type CreateProductType = InferType<typeof createProductInput>;
export declare type UpdateProductType = {
    name?: string;
    salePrice?: number;
    boughtPrice?: number;
    imageURL?: string;
    weight?: number;
    description?: string;
};
//# sourceMappingURL=types.d.ts.map