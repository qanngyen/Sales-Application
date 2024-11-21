import express from 'express'
import { Router } from "express";

import purchaseInvoicesController from './purchase-invoices.controller'

const router = express.Router();

router
    .post('/', purchaseInvoicesController.createPurchaseInvoice)
    .get('/:id', purchaseInvoicesController.readPurchaseInvoice)
    .put('/:id', purchaseInvoicesController.updatePurchaseInvoice)
    .delete('/:id', purchaseInvoicesController.deletePurchaseInvoice)