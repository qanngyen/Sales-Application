import salesinvoicesController from "./salesinvoices.controller";

import express from "express";

const router = express.Router();

router
    .get("/", salesinvoicesController.getAllSalesInvoicesController)
    .get("/:id", salesinvoicesController.getSalesInvoiceByIdController)
    .post("/", salesinvoicesController.addSalesInvoiceController)
    .put("/", salesinvoicesController.updateSalesInvoiceController)
    .delete("/:id", salesinvoicesController.deleteSalesInvoiceController);
    
export default router;