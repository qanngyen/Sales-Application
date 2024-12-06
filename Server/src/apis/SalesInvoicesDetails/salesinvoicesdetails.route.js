import salesinvoicesdetailsController from "./salesinvoicesdetails.controller";

import express from "express";

const router = express.Router();

router
    .get("/:id", salesinvoicesdetailsController.getSalesInvoicesDetailsByIdController)
    .post("/", salesinvoicesdetailsController.addSalesInvoicesDetailsController)
    .put("/", salesinvoicesdetailsController.updateSalesInvoicesDetailsController)
    .delete("/", salesinvoicesdetailsController.deleteSalesInvoicesDetailsController)

export default router;