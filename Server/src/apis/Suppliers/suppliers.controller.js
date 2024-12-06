import suppliersService from "./suppliers.service.js";

class SupplierController {
    // xem tất cả
    getAllSuppliersController = async (req, res, next) => {
        try {
            console.log('abcefuhir')
            const results = await suppliersService.getAllSuppliersService();
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }
    // xem by id
    getSupplierByIdController = async (req, res, next) => {
        try {
            const result = await suppliersService.getSupplierByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // thêm mới
    addSupplierController = async (req, res, next) => {
        try {
            const result = await suppliersService.addNewSupplierService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    // cập nhật
    updateSupplierController = async (req, res, next) => {
        try {
            const result = await suppliersService.updateSupplierService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa
    deleteSupplierController = async (req, res, next) => {
        try {
            const result = await suppliersService.deleteSupplierService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new SupplierController