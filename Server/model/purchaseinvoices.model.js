import pool from '../data/connection.js'

class PurchaseInvoicesModel {
    // xem tất cả hóa đơn mua
    async getAllPurchaseInvoices() {
        try {
            await pool.connect()
            const result = await pool.request().query('select * from HOADONMUA')
            return {
                message: 'success to get all purchase invoices',
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: 'Fail to get all purchase invoices',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // tìm kiếm hóa đơn mua theo mã
    async getPurchaseInvoiceById(purchaseInvoiceId) {
        try {
            await pool.connect()
            console.log(purchaseInvoiceId)
            const result = await pool.request().input('input', purchaseInvoiceId).execute('call_readHoaDonMua')
            return {
                message: 'success to get purchase invoice by id',
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: 'Fail to get purchase invoice by id',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // thêm hóa đơn mua
    async addPurchaseInvoice(purchaseInvoice) {
        try {
            await pool.connect()
            const result = await pool.request()
               .input('HDN_TT', purchaseInvoice.HDN_tt)
               .input('HDN_thue', purchaseInvoice.HDN_thue)
               .input('NCC_Acno', purchaseInvoice.NCC_acno)
               .input('NCC_Bname', purchaseInvoice.NCC_bname)
               .input('NCC_Brname', purchaseInvoice.NCC_brname)
               .input('NCC_ID', purchaseInvoice.NCC_id)
               .output('ID')
               .execute('call_sp_XuLyHoaDonMua')
            console.log(result)
            return {
                message: 'success to add purchase invoice',
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: 'Fail to add purchase invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // cập nhật hóa đơn mua
    async updatePurchaseInvoice(purchaseInvoice) {
        try {
            console.log('đã vào')
            await pool.connect()
            const result = await pool.request()
               .input('HDN_ID', purchaseInvoice.HDN_id)
               .input('HDN_TT', purchaseInvoice.HDN_tt)
               .input('HDN_thue', purchaseInvoice.HDN_thue)
               .input('NCC_Acno', purchaseInvoice.NCC_acno)
               .input('NCC_Bname', purchaseInvoice.NCC_bname)
               .input('NCC_Brname', purchaseInvoice.NCC_brname)
               .input('NCC_ID', purchaseInvoice.NCC_id)
               .execute('call_updateHoaDonMua')
            return {
                message: 'success to update purchase invoice',
                data: result
            }
        } catch (error) {
            console.log('đã vào')
            console.error(error)
            return {
                message: 'Fail to update purchase invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xóa hóa đơn mua
    async deletePurchaseInvoice(purchaseInvoiceId) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', purchaseInvoiceId).query('delete from HOADONMUA where HDN_ID = @input')
            return {
                message: 'success to delete purchase invoice',
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: 'Fail to delete purchase invoice',
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new PurchaseInvoicesModel()