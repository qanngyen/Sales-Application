import purchaseinvoicesdetailsService from "./purchaseinvoicesdetails.service";

class PurchaseInvoicesDetailsController {
    // thêm hóa đơn chi tiết
    addPurchaseInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesdetailsService.addNewPurchaseInvoicesDetailService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    // cập nhật hóa đơn chi tiết
    updatePurchaseInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesdetailsService.updatePurchaseInvoicesDetailByIdService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa hóa đơn chi tiết
    deletePurchaseInvoicesDetailsController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesdetailsService.deletePurchaseInvoicesDetailByIdService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xem hóa đơn chi tiết theo id
    getPurchaseInvoicesDetailsByIdController = async (req, res, next) => {
        try {
            const result = await purchaseinvoicesdetailsService.getPurchaseInvoicesDetailByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new PurchaseInvoicesDetailsController();