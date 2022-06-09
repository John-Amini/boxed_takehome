# boxed_takehome

orders

id , userId (dont worry about validation on this) , shippingLocation , shippingCost , status

products

id , name (req) , salePrice (req) , boughtPrice (req) , imageURL , weight (req) , description , isDeleted


ordersProductTable

id , orderId , productId , salePrice , boughtPrice
