import express from 'express'

import suppliersController from './suppliers.controller.js'

const router = express.Router()

router
    .post('/', suppliersController.addSupplierController)
    .get('/:id', suppliersController.getSupplierByIdController)
    .put('/', suppliersController.updateSupplierController)
    .delete('/:id', suppliersController.deleteSupplierController)
    .get('/', suppliersController.getAllSuppliersController)

export default router