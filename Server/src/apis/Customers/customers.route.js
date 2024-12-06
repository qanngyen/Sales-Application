import express from 'express'

import customersController from "./customers.controller";

const router = express.Router();

router
    .get('/', customersController.getAllCustomerController)
    .get('/:id', customersController.getCustomerByIdController)
    .post('/', customersController.addCustomerController)
    .put('/', customersController.updateCustomerController)
    .delete('/:id', customersController.deleteCustomerController)
export default router;