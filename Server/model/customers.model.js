import pool from '../data/connection.js'

class CustomersModel {
    // thêm khách hàng
    async addCustomer(customer) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('Cust_ID', customer.Cust_id)
                   .input('Cust_Name', customer.Cust_name)
                   .input('Cust_ad', customer.Cust_ad)
                   .output('ID')
                   .execute('call_sp_XulyCustomer')
            return {
                message: 'success to add customer',
                data: result
            }
        } catch (e) {
            return {
                message: 'Failed to add customer',
                error: e.message
            }
        } finally {
            pool.close()
        }
    }
    // xem tất cả khách hàng
    async getAllCustomers() {
        try {
            await pool.connect()
            const result = await pool.request().query('SELECT * FROM customer')
            return {
                message: 'success to get all customers',
                data: result.recordset
            }
        } catch (e) {
            return {
                message: 'Failed to get all customers',
                error: e.message
            }
        } finally {
            pool.close()
        }
    }
    // xem customer theo ID
    async getCustomerById(customerId) {
        try {
            console.log('đã vào được model')
            await pool.connect()
            const result = await pool.request().input('input', customerId).execute('call_readCustomers')
            return {
                message: 'success to get customer by id',
                data: result.recordset
            }
        } catch (e) {
            return {
                message: 'Failed to get customer by id',
                error: e.message
            }
        } finally {
            pool.close()
        }
    }
    // sửa customer theo ID
    async updateCustomerById(customer) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('Cust_ID', customer.Cust_id)
                   .input('Cust_ID_update', customer.Cust_id_update)
                   .input('Cust_Name', customer.Cust_name)
                   .input('Cust_ad', customer.Cust_ad)
                   .execute('call_updateCustomers')
            return {
                message: 'success to update customer',
                data: result
            }
        } catch (e) {
            return {
                message: 'Failed to update customer',
                error: e.message
            }
        } finally {
            pool.close()
        }
    }
    // xóa customer theo ID
    async deleteCustomerById(customerId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', customerId).query('DELETE FROM Customer WHERE Cust_id = @input')
            return {
                message: 'success to delete customer',
                data: result
            }
        } catch (e) {
            return {
                message: 'Failed to delete customer',
                error: e.message
            }
        } finally {
            pool.close()
        }
    }
}

export default new CustomersModel()