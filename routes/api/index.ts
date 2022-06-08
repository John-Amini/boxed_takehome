const router = require("express").Router();

import productRouter from "./products"
import orderRouter from "./orders"

router.use("/products",productRouter);
router.use("/orders",orderRouter);



export default router;
