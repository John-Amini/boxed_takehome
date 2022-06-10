# boxed_takehome

## Tables
------------------------

### Orders


|id:integer|userId:integer| shippingLocation:string |shippingCost:float|totalPrice:float|status:string|createdAt:Date|updatedAt:Date
|--|--|--|--|--|--|--|--|
| Primary Key| FK from a users table |  ||| |

### Products


|id:integer|name:string | salePrice:float |boughtPrice:float|imageURL:string|weight:float|description:string|isDeleted:boolean|createdAt:Date|updatedAt:Date
|--|--|--|--|--|--|--|--|--|--|
| Primary Key|  |  ||| |

### OrderProducts

|id:integer  | orderId:integer | productId:integer | salePrice:float | boughtPrice:float | imageURL:string | quantity:integer | createdAt:Date |updatedAt:Date
|--|--|--|--|--|--|--|--|--|
| Primary Key| FK from Orders table | FK from products table |


## Routes
------------------------

## Product
### Create Product
    POST /api/products
    {
    "name":"Bananas",
    "salePrice":"50.00",
    "boughtPrice":"35.00",
    "imageURL":"www.thisisbanana.com"
    "weight":"23.00",
    "description":"Bananas from some country that are tasty"
    }
    imageURL and description not required
### Get ALL Products
    GET /api/products?page=0&perPage=10 (page and perPage are optional)
### Get ONE Product
    GET /api/products/:id
### DELETE Product
    DELETE /api/products/:id
### UPDATE Product
    PUT /api/products/:id
    {
    "name":"Apples",
    "description":"Apples from some country that are tasty",
    "salePrice":"10",
    "boughtPrice":"30.00",
    "imageURL":"www.thisisbanana.com"
    "weight":"23.00",
    }

## Order
### Create Order
    POST /api/orders
    {
    "userId":1,
    "shippingLocation":"South Plainfield, New Jersey",
    "products":[{"id":1,"quantity":3},{"id":2,"quantity":10}]
    }
### Get ONE Order
    GET /api/orders/:id?select=totalPrice,OrderProduct
    Select options: id,userId,totalPrice,shippingLocation,shippingCost,status,createdAt,updatedAt,OrderProduct (no select options returns all information including products bought with the order)
### Get ALL Orders
    Get api/orders/?page=0&perPage=2&select=id,totalPrice,OrderProduct
    Select options: id,userId,totalPrice,shippingLocation,shippingCost,status,createdAt,updatedAt,OrderProduct (no select options returns all information including products bought with the order)(page and perPage are optional)
### DELETE/CANCEL Order
    DELETE api/orders/:id
### UPDATE Order
    PUT api/orders/:id
    {
    "shippingLocation":"Plainfield, New Jersey",
    "status": "Completed"
    }
