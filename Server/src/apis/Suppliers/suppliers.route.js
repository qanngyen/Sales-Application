import express from 'express'

import suppliersController from './suppliers.controller.js'

const router = express.Router()

router
    .post('/', suppliersController.xuLySupplier)
    .get('/:id', suppliersController.readSupplier)
    .post('/:id', suppliersController.updateSupplier)
    .delete('/:id', suppliersController.deleteSupplier)

export default router