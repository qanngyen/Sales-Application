import purchaseinvoicesdetail from "../../../model/purchaseinvoicesdetail.model.js";

class PurchaseInvoicesDetailService {
    // thêm chi tiết hóa đơn nhập
    async addNewPurchaseInvoicesDetailService(purchaseInvoicesDetail) {
        try {
            const result = await purchaseinvoicesdetail.addPurchaseInvoiceDetails(purchaseInvoicesDetail);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // xóa chi tiết hóa đơn nhập theo id
    async deletePurchaseInvoicesDetailByIdService(purchaseInvoicesDetailId) {
        try {
            const result = await purchaseinvoicesdetail.deletePurchaseInvoiceDetails(purchaseInvoicesDetailId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // cập nhật chi tiết hóa đơn nhập theo id
    async updatePurchaseInvoicesDetailByIdService(purchaseInvoicesDetail) {
        try {
            const result = await purchaseinvoicesdetail.updatePurchaseInvoiceDetails(purchaseInvoicesDetail);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // lấy chi tiết hóa đơn nhập theo id
    async getPurchaseInvoicesDetailByIdService(purchaseInvoicesDetailId) {
        try {
            const result = await purchaseinvoicesdetail.getPurchaseInvoiceDetailsById(purchaseInvoicesDetailId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default new PurchaseInvoicesDetailService();