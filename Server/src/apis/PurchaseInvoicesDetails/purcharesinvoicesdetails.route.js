import purchaseinvoicesdetailsController from "./purchaseinvoicesdetails.controller";

import express from "express";

const router = express.Router();

router
    .get("/:id", purchaseinvoicesdetailsController.getPurchaseInvoicesDetailsByIdController)
    .post("/", purchaseinvoicesdetailsController.addPurchaseInvoicesDetailsController)
    .put("/", purchaseinvoicesdetailsController.updatePurchaseInvoicesDetailsController)
    .delete("/", purchaseinvoicesdetailsController.deletePurchaseInvoicesDetailsController);

export default router;