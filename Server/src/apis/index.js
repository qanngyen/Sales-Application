import supplierRoute from './Suppliers/suppliers.route.js'
import customerRouter from './Customers/customers.route.js'
import purchaseInvoiceRouter from './Purchase-Invoices/purchase-invoices.route.js'
import express from 'express'
const route = express.Router()

route
  .use('/supplier', supplierRoute)
  .use('/customer', customerRouter)
  // .use('/purchase-invoices', purchaseInvoiceRouter)


export default route