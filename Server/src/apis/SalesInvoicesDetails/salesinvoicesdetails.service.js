import salesinvoicesdetailModel from "../../../model/salesinvoicesdetail.model";

class SalesInvoicesDetailService {
    // thêm
    async addNewSalesInvoicesDetailService(salesInvoicesDetail) {
        try {
            const result = await salesinvoicesdetailModel.addNewSalesInvoicesDetails(salesInvoicesDetail);
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }
    // xem by id
    async getSalesInvoicesDetailByIdService(salesInvoicesDetailId) {
        try {
            const result = await salesinvoicesdetailModel.getSalesInvoicesDetailsById(salesInvoicesDetailId);
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }
    // xóa
    async deleteSalesInvoicesDetailService(salesInvoicesDetailId) {
        try {
            const result = await salesinvoicesdetailModel.deleteSalesInvoicesDetails(salesInvoicesDetailId);
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }
    // cập nhật
    async updateSalesInvoicesDetailService(salesInvoicesDetail) {
        try {
            const result = await salesinvoicesdetailModel.updateSalesInvoicesDetails(salesInvoicesDetail);
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }   
}

export default new SalesInvoicesDetailService();
