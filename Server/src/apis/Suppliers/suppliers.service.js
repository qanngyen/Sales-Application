import suppliersModel from "../../../model/suppliers.model";

class SupplierService {
    // thêm nhà cung cấp
    async addNewSupplierService(supplier) {
        try {
            const result = await suppliersModel.addNewSupplier(supplier);
            return result
        } catch (error) {
            console.error(error.message);
        }
    } 
    // xem tất cả thông tin nhà cung cấp
    async getAllSuppliersService() {
        try {
            const result = await suppliersModel.getAllSuppliers();
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // xem thông tin by id
    async getSupplierByIdService(supplierId) {
        try {
            const result = await suppliersModel.getSupplierById(supplierId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // xóa thông tin 
    async deleteSupplierService(supplierId) {
        try {
            const result = await suppliersModel.deleteSupplier(supplierId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // cập nhật thông tin nhà cung cấp
    async updateSupplierService(supplier) { 
        try {
            const result = await suppliersModel.updateSupplier(supplier);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default new SupplierService();