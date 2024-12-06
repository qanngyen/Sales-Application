import productsController from "./products.controller";

import express from "express";

const router = express.Router();

router
    .get("/:id", productsController.getProductByIdController)
    .put("/", productsController.updateProductController)
    .delete("/:id", productsController.deleteProductController);

export default router;