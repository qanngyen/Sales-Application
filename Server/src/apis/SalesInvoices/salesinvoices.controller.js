import salesinvoicesService from "./salesinvoices.service";

class SalesInvoicesController {
    // xem tất cả
    getAllSalesInvoicesController = async (req, res, next) => {
        try {
            const results = await salesinvoicesService.getAllSalesInvoicesService();
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }
    // xem by id
    getSalesInvoiceByIdController = async (req, res, next) => {
        try {
            const result = await salesinvoicesService.getSalesInvoiceByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // thêm mới
    addSalesInvoiceController = async (req, res, next) => {
        try {
            const result = await salesinvoicesService.addSalesInvoiceService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    // cập nhật
    updateSalesInvoiceController = async (req, res, next) => {
        try {
            const result = await salesinvoicesService.updateSalesInvoiceByIdService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa
    deleteSalesInvoiceController = async (req, res, next) => {
        try {
            const result = await salesinvoicesService.deleteSalesInvoiceByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new SalesInvoicesController();