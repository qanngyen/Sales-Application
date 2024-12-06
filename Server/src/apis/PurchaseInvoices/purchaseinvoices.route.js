import express from 'express'

import purchaseinvoicesController from './purchaseinvoices.controller'

const router = express.Router()

router
    .get('/', purchaseinvoicesController.getAllPurchaseInvoicesController)
    .get('/:id', purchaseinvoicesController.getPurchaseInvoiceByIdController)
    .post('/', purchaseinvoicesController.addPurchaseInvoiceController)
    .put('/', purchaseinvoicesController.updatePurchaseInvoiceController)
    .delete('/:id', purchaseinvoicesController.deletePurchaseInvoiceController)

export default router
