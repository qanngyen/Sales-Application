import pool from '../data/connection.js'

class SalesInvoicesDetails {
    // thêm chi tiết hóa đơn bán
    async addNewSalesInvoicesDetails(salesInvoicesDetailsArray) {
        try {
            const results = []
            await pool.connect()
            for (let salesInvoicesDetails of salesInvoicesDetailsArray) {
                const result = await pool.request()
                .input('HDB_id', salesInvoicesDetails.HDB_id)
                .input('HH_id', salesInvoicesDetails.HH_id)
                .input('HDB_SoLuong', salesInvoicesDetails.HDB_soluong)
                .execute('sp_XuLyBanHang')
                results.push(result)
            }
            return {
                message: 'Success to add new sales invoices details',
                data: results
            }
        } catch (error) {
            console.error(error.message);
            return {
                message: 'Fail to add new sales invoices details',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xóa chi tiết hóa đơn bán
    async deleteSalesInvoicesDetails(salesInvoicesDetailsId) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('HDB_id', salesInvoicesDetailsId.HDB_id)
                   .input('HH_id', salesInvoicesDetailsId.HH_id)
                   .query('delete from CHITIETHOADONBAN where HDB_id = @HDB_id and HH_id = @HH_id')
            return {
                message: 'Success to delete sales invoices details',
                data: result
            }
        } catch (error) {
            console.error(error.message);
            return {
                message: 'Fail to delete sales invoices details',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // cập nhật chi tiết hóa đơn ban
    async updateSalesInvoicesDetails(salesInvoicesDetails) {
        try {
            await pool.connect()
            const result = await pool.request()
                .input('HH_ID', salesInvoicesDetails.HH_id)
                .input('HDB_soluong', salesInvoicesDetails.HDB_soluong)
                .input('HH_ID_update', salesInvoicesDetails.HH_id_update)
                .input('HDB_id', salesInvoicesDetails.HDB_id)
                .execute('updateChiTietHoaDonBan')
            return {
                message: 'Success to update sales invoices details',
                data: result
            }
        } catch (err) {
            console.error(err)
            return {
                message: 'Fail to update sales invoices details',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // lấy tất cả chi tiết hóa đơn bán thông qua id hóa đơn
    async getSalesInvoicesDetailsById(salesInvoicesDetailsId) {
        try {
            await pool.connect()
            const result = await pool.request()
                   .input('HDB_id', salesInvoicesDetailsId)
                   .query('select * from CHITIETHOADONBAN where HDB_id = @HDB_id')
            return {
                message: 'Success to get sales invoices details by id',
                data: result
            }
        } catch (error) {
            console.error(error.message);
            return {
                message: 'Fail to get sales invoices details by id',
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new SalesInvoicesDetails()