import supplierRoute from './Suppliers/suppliers.route.js'
import customerRouter from './Customers/customers.route.js'
import express from 'express'
const route = express.Router()

route
  .use('/supplier', supplierRoute)
  .use('/customer', customerRouter);


export default route