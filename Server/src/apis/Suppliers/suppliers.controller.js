import suppliersService from "./suppliers.service.js";

class SupplierController {
    xuLySupplier = async (req, res, next) => {
        try {
            const result = await suppliersService.xuLySupplierService(req.body)
            return {
                message: res.status(200).json('Thanh cong'),
                data: result
            }
        } catch (error) {
            console.error(`Error:`, error);
        }
    }
    readSupplier = async (req, res, next) => {
        try {
            const result = await suppliersService.readSupplier(req.params.id)
            return {
                message: res.status(200).json('Thanh cong'),
                data: result
            }
        } catch (error) {
            console.error(`Error:`, error);
        }
    }
    updateSupplier = async (req, res, next) => {
        try {
            const result = await suppliersService.updateSupplier(req.params.id, req.body)
            return {
                message: res.status(200).json('Thanh cong'),
                data: result
            }
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
    // hàm hữu danh
    deleteSupplier = async (req, res, next) => {
        try {
            const result = await suppliersService.deleteSupplier(req.params.id)
            return {
                message: res.status(200).json('Thanh cong'),
                data: result
            }
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export default new SupplierController