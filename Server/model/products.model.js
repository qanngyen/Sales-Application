import pool from '../data/connection.js'

class Product {
    // cập nhật sản phẩm
    async updateProduct(product) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('HH_id', product.HH_id)
                   .input('HH_name', product.HH_name)
                   .input('DVT', product.Dvt)
                   .execute('updateProduct')
            return {
                message: 'success to update product',
                data: result
            }
        } catch (error) {
            console.error(error.message)
            return {
                message: 'fail to update product',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xóa sản phẩm
    async deleteProduct(productId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', productId).query('delete from HANGHOA where HH_id = @input')
            return {
                message: 'success to delete product',
                data: result
            }
        } catch (error) {
            console.error(error.message)
            return {
                message: 'fail to delete product',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // tìm kiếm sản phẩm
    async getProductById(productId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', productId).execute('selectProduct')
            return {
                message: 'success to get product by id',
                data: result
            }
        } catch (error) {
            console.error(error.message)
            return {
                message: 'fail to get product by id',
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new Product()