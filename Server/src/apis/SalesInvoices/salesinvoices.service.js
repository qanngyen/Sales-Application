import salesinvoicesModel from "../../../model/salesinvoices.model";

class SalesInvoicesService {
    // xem tất cả
    async getAllSalesInvoicesService() {
        try {
            const result = await salesinvoicesModel.getAllSalesInvoice();
            return result
        } catch (error) {
            console.log(error)
        } 
    }
    // xem theo id
    async getSalesInvoiceByIdService(salesInvoiceId) {
        try {
            const result = await salesinvoicesModel.getSalesInvoiceById(salesInvoiceId);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // thêm mới
    async addSalesInvoiceService(salesInvoice) {
        try {
            const result = await salesinvoicesModel.addSalesInvoice(salesInvoice);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // sửa theo id
    async updateSalesInvoiceByIdService(salesInvoice) {
        try {
            const result = await salesinvoicesModel.updateSalesInvoice(salesInvoice);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // xóa theo id
    async deleteSalesInvoiceByIdService(salesInvoiceId) {
        try {
            const result = await salesinvoicesModel.deleteSalesInvoice(salesInvoiceId);
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default new SalesInvoicesService()