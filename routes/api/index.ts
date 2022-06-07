const router = require("express").Router();

import productRouter from "./products"

router.use("/products",productRouter);




export default router;
