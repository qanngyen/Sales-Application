import PurchaseInvoicesModel from '../../../model/purchaseinvoices.model.js'

class PurchaseInvoicesService {
    // xem tất cả
    async getAllPurchaseInvoicesService() {
        try {
            const result = await PurchaseInvoicesModel.getAllPurchaseInvoices()
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // xem thông tin by id
    async getPurchaseInvoiceByIdService(purchaseInvoiceId) {
        try {
            const result = await PurchaseInvoicesModel.getPurchaseInvoiceById(purchaseInvoiceId)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // thêm mới
    async addPurchaseInvoiceService(purchaseInvoice) {
        try {
            const result = await PurchaseInvoicesModel.addPurchaseInvoice(purchaseInvoice)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // sửa theo id
    async updatePurchaseInvoiceByIdService(purchaseInvoice) {
        try {
            const result = await PurchaseInvoicesModel.updatePurchaseInvoice(purchaseInvoice)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // xóa thông tin
    async deletePurchaseInvoiceService(purchaseInvoiceId) {
        try {
            const result = await PurchaseInvoicesModel.deletePurchaseInvoice(purchaseInvoiceId)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default new PurchaseInvoicesService()