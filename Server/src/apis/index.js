import supplierRoute from './Suppliers/suppliers.route.js'
import customerRouter from './Customers/customers.route.js'
import purchaseVoicesRouter from './PurchaseInvoices/purchaseinvoices.route.js'
import salesinvoicesRouter from './SalesInvoices/salesinvoices.route.js'
import purchaseInvoicesDetailsRouter from './PurchaseInvoicesDetails/purcharesinvoicesdetails.route.js'
import salesInvoicesDetailsRouter from './SalesInvoicesDetails/salesinvoicesdetails.route.js'
import productsRouter from './Products/products.route.js'
import loginRouter from './Auth/Login.js'
import verifyTokenHandler from '../../Middlewares/VerifyToken.js'


import express from 'express'
const route = express.Router()

route
  .use(verifyTokenHandler) // middlewares xác thực người dùng
  .use('/login', loginRouter)
  // .use(verifyTokenHandler) // middlewares xác thực người dùng
  .use('/supplier', supplierRoute) // done
  .use('/customer', customerRouter) // done
  .use('/purchaseInvoices', purchaseVoicesRouter) // done
  .use('/salesinvoices', salesinvoicesRouter) // done
  .use('/purchaseInvoicesDetails', purchaseInvoicesDetailsRouter) // done
  .use('/salesinvoicesDetails', salesInvoicesDetailsRouter) // done
  .use('/products', productsRouter) // done

export default route