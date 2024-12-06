import purchaseinvoicesService from "./purchaseinvoices.service";

class PurchaseInvoicesController {
    // xem tất cả
    getAllPurchaseInvoicesController = async (req, res, next) => {
        try {
            const results = await purchaseinvoicesService.getAllPurchaseInvoicesService();
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }
    // xem by id
    getPurchaseInvoiceByIdController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesService.getPurchaseInvoiceByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // thêm mới
    addPurchaseInvoiceController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesService.addPurchaseInvoiceService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa
    deletePurchaseInvoiceController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesService.deletePurchaseInvoiceService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // cập nhật
    updatePurchaseInvoiceController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesService.updatePurchaseInvoiceByIdService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new PurchaseInvoicesController();