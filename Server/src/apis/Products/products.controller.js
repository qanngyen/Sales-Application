import productsService from "./products.service";

class ProductController {
    // cập nhật
    async updateProductController(req, res, next) {
        try {
            const result = await productsService.updateProductByIdService(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xóa
    async deleteProductController(req, res, next) {
        try {
            const result = await productsService.deleteProductByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    // xem by id
    async getProductByIdController(req, res, next) {
        try {
            const result = await productsService.getProductByIdService(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();