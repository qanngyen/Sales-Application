import express from 'express'
import { Router } from 'express';
import customersController from "./customers.controller";

const router = Router();

router
    .post('/', customersController.xuLyCustomer)
    .get('/:id', customersController.readingCustomer)

export default router;