import pool from '../data/connection.js'

class SalesInvoices {
    // xem tất cả hóa đơn bán
    async getAllSalesInvoice() {
        try {
            await pool.connect()
            const result = await pool.request().query('SELECT * FROM HOADONBAN')
            return {
                message: 'success to get all sales invoice',
                data: result
            }
        } catch (e) {
            console.log(e)
            return {
                message: 'Fail to get all sales invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xem một hóa đơn by id
    async getSalesInvoiceById(salesInvoiceId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', salesInvoiceId).execute('call_readHoaDonBan')
            return {
                message: 'success to get sales invoice by id',
                data: result.recordset
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to get sales invoice by id',
                data: null
            }
        } finally {
            pool.close()
        }
    } 
    // thêm mới hóa đơn bán
    async addSalesInvoice(salesInvoice) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('Cust_id', salesInvoice.Cust_id)
                   .input('HDB_TT', salesInvoice.HDB_tt)
                   .input('HDB_thue', salesInvoice.HDB_thue)
                   .input('Cust_acno', salesInvoice.Cust_acno)
                   .input('Cust_ddname', salesInvoice.Cust_ddname)
                   .output('ID')
                   .execute('Call_sp_XuLyHoaDonBan')
                console.log(result)
            return {
                message: 'success to add new sales invoice',
                data: result
            }
        } catch (err) {
            console.error(err)
            return {
                message: 'Fail to add new sales invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // cập nhật hóa đơn bán
    async updateSalesInvoice(salesInvoice) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('HDB_id', salesInvoice.HDB_id)
                   .input('Cust_id', salesInvoice.Cust_id)
                   .input('HDB_TT', salesInvoice.HDB_tt)
                   .input('HDB_thue', salesInvoice.HDB_thue)
                   .input('Cust_acno', salesInvoice.Cust_acno)
                   .input('Cust_ddname', salesInvoice.Cust_ddname)
                   .execute('call_updateHoaDonBan')
            return {
                message: 'success to add new sales invoice',
                data: result
            }
        } catch (err) {
            console.error(err)
            return {
                message: 'Fail to add new sales invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xóa hóa đơn bán
    async deleteSalesInvoice(salesInvoiceId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', salesInvoiceId).query('delete from HOADONBAN where HDB_ID = @input')
            return {
                message: 'success to delete sales invoice',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to delete sales invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new SalesInvoices()