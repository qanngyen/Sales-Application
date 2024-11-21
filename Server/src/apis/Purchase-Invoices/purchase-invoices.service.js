import purchaseInvoiceModel from '../../../model/purchase-invoices.model'

class purchaseInvoiceService {
    async purchaseInvoiceProcessing (purchaseInvoice) {
        try {
            const result = await purchaseInvoiceModel.addPurchaseInvoice(purchaseInvoice)
            return result
        } catch (err) {
            console.log(err)
        }   
    }
    async getPurchaseInvoice (purchaseInvoiceID) {
        try {
            const result = await purchaseInvoiceModel.readPurchaseInvoice(purchaseInvoiceID)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async updatePurchaseInvoice (purchaseInvoiceID, purchaseInvoice) {
        try {
            const result = await purchaseInvoiceModel.updatePurchaseInvoice(purchaseInvoiceID, purchaseInvoice)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async deletePurchaseInvoice (purchaseInvoiceID) {
        try {
            const result = await purchaseInvoiceModel.deletePurchaseInvoice(purchaseInvoiceID)
            return result
        } catch (err) {
            console.log(err)
        }
    }
}

export default new purchaseInvoiceService()