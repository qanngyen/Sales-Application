import pool from '../data/connection.js'

class SuppliersModel {
    // thêm mới nhà cung cấp 
    async addNewSupplier(supplier) {
        try {
            await pool.connect()
            const result = await pool.request()
               .input('NCC_id', supplier.NCC_id)
               .input('NCC_name', supplier.NCC_name)
               .input('NCC_ad', supplier.NCC_ad)
               .input('NCC_phone', supplier.NCC_phone)
               .input('NCC_fax', supplier.NCC_fax)
               .input('NCC_web', supplier.NCC_web)
               .input('NCC_email', supplier.NCC_email)
               .output('ID')
               .execute('Call_sp_XuLyNhaCungCap')
            return {
                message: 'success to add new supplier',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to add new supplier',
                data: null
            }
        } finally { 
            pool.close()
        }
    }
    // xem tất cả nhà cung cấp
    async getAllSuppliers() {
        try {
            await pool.connect()
            const result = await pool.request().query('SELECT * FROM NHACUNGCAP')
            return {
                message: 'success to get all suppliers',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to get all suppliers',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // tìm kiếm nhà cung cấp qua id
    async getSupplierById(supplierID) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', supplierID).execute('call_readNcc')
            return {
                message: 'success to get supplier by id',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to get supplier by id',
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // cập nhật nhà cung cấp
    async updateSupplier(supplier) {
        try {
            await pool.connect()
            const result = await pool.request()
               .input('NCC_id', supplier.NCC_id)
               .input('NCC_id_update', supplier.NCC_id_update)
               .input('NCC_name', supplier.NCC_name)
               .input('NCC_ad', supplier.NCC_ad)
               .input('NCC_phone', supplier.NCC_phone)
               .input('NCC_fax', supplier.NCC_fax)
               .input('NCC_web', supplier.NCC_web)
               .input('NCC_email', supplier.NCC_email)
               .execute('Call_updateNcc')
            return {
                message: 'success to update supplier',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to update supplier',
                data: null
            }
        } finally { 
            pool.close()
        }
    }
    // xóa nhà cung cấp
    async deleteSupplier(supplierID) {
        try {
            await pool.connect()
            const result = await pool.request().input('input', supplierID).query('delete from NHACUNGCAP where NCC_id = @input')
            return {
                message: 'success to delete supplier',
                data: result
            }
        } catch (e) {
            console.error(e)
            return {
                message: 'Fail to delete supplier',
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new SuppliersModel()