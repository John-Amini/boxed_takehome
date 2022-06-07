"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const { environment, port } = require("./config");
//  const isProduction = environment === "production";
//  const { ValidationError } = require("sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default); // Connect all the routes
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
//  // Process sequelize errors
//  app.use((err, _req, _res, next) => {
//    // check if error is a Sequelize error:
//    if (err instanceof ValidationError) {
//      err.errors = err.errors.map((e) => e.message);
//      err.title = 'Validation error';
//    }
//    next(err);
//  });
// Error formatter
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
exports.default = app;
//# sourceMappingURL=main.js.map