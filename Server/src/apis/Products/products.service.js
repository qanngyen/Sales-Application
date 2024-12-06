import productsModel from "../../../model/products.model";

class ProductsService {
    // cập nhất
    async updateProductByIdService(product) {
        try {
            const result = await productsModel.updateProduct(product);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // xóa
    async deleteProductByIdService(productId) {
        try {
            const result = await productsModel.deleteProduct(productId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
    // tìm kiếm theo id
    async getProductByIdService(productId) {
        try {
            const result = await productsModel.getProductById(productId);
            return result
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default new ProductsService();