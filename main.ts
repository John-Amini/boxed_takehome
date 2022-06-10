 import express from "express";
 import routes from "./routes";
 import dotenv from "dotenv"
 const { environment , port } = require("./config");

 const app = express();


 app.use(express.json());



 app.use(routes);
 app.use((_req, _res, next) => {
   const err = new Error("The requested resource couldn't be found.") as any;
   err.title = "Resource Not Found";
   err.errors = ["The requested resource couldn't be found."];
   err.status = 404;
   next(err);
 });


 app.use((err, _req, res, _next) => {
   res.status(err.status || 500);
   console.error(err);
   res.json({
     title: err.title || 'Server Error',
     message: err.message,
     errors: err.errors,
     stack: err.stack,
   });
 });

 app.listen(port, () => console.log(`Listening on port ${port}...`));

 export default app;
