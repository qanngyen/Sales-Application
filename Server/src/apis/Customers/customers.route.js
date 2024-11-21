import express from 'express'

import customersController from "./customers.controller";

const router = express.Router();

router
    .post('/', customersController.xuLyCustomer)
    .get('/:id', customersController.readingCustomer)
    .post('/:id', customersController.updatingCustomer)
    .delete('/:id', customersController.deleteCustomer)

export default router;