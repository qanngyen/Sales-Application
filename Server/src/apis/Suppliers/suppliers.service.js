import suppliersModel from "../../../model/suppliers.model.js";

class SupplierService {
    async xuLySupplierService(supplierExample) {
        try {
            console.log('Đã vào được service')
            const result = await suppliersModel.suppliersProcessing(supplierExample)
            return {
                message: 'Thành công',
                data: result
            }
        } 
        catch(error) {
            console.error(`Error:`, error);
        }
    }
    async readSupplier(supplierID) {
        try {
            console.log('Đã vào được service read ncc')
            const result = await suppliersModel.readSuppliers(supplierID)
            return {
                message: 'Thành công',
                data: result
            }
        } catch(error) {
            console.log('Error', error)
        }
    }
    async updateSupplier (supplierID, valuesUpdateObject) {
        try {
            console.log('Đã vào được update supplier service')
            const result = await suppliersModel.updateSupplier(supplierID, valuesUpdateObject)
            return {
                message: 'Thành công',
                data: result
            }
        } catch (error) {
            console.log('Error', error)
        }
    }
    async deleteSupplier (supplierID) {
        try {
            console.log('Đã vào được delete supplier service')
            const result = await suppliersModel.deleteSupplier(supplierID)
            return {
                message: 'Thành công',
                data: result
            }
        } catch (error) {
            console.log('Error',error)
        }
    }
}

export default new SupplierService