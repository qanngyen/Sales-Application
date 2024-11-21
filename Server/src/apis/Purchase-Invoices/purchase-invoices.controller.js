import purchaseInvoiceService from './purchase-invoices.service'

class PurchaseInvoiceController {
    async createPurchaseInvoice(req, res, next) {
        try {
            const result = await purchaseInvoiceService.purchaseInvoiceProcessing(req.body)
            return res.status(200).json({
                message: 'Thành công',
                data: result
            })
        } catch (error) {
            console.error(`Error:`, error)
        }
    }
    async readPurchaseInvoice(req, res, next) {
        try {
            const result = await purchaseInvoiceService.getPurchaseInvoice(req.params.id)
            return {
                message: res.status(200).json('Thành công'),
                data: result
            }
        } catch (error) {
            console.error(`Error:`, error)
        }
    }
    async updatePurchaseInvoice(req, res, next) {
        try {
            const result = await purchaseInvoiceService.updatePurchaseInvoice(req.params.id, req.body)
            return {
                message: res.status(200).json('Thành công'),
                data: result
            }
        } catch (error) {
            console.error(`Error:`, error)
        }
    }
    async deletePurchaseInvoice(req, res, next) {
        try {
            const result = await purchaseInvoiceService.deletePurchaseInvoice(req.params.id)
            return {
                message: res.status(200).json('Thành công'),
                data: result
            }
        } catch (error) {
            console.error(`Error:`, error)
        }
    }
}

export default new PurchaseInvoiceController()