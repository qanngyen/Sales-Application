import salesinvoicesdetailsService from "./salesinvoicesdetails.service";

class SalesInvoicesDetailsController {
    // thêm
    addSalesInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await salesinvoicesdetailsService.addNewSalesInvoicesDetailService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    // cập nhật
    updateSalesInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await salesinvoicesdetailsService.updateSalesInvoicesDetailService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa
    deleteSalesInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await salesinvoicesdetailsService.deleteSalesInvoicesDetailService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xem by id
    getSalesInvoicesDetailsByIdController = async (req, res, next) => {
        try {
            const result = await salesinvoicesdetailsService.getSalesInvoicesDetailByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new SalesInvoicesDetailsController();