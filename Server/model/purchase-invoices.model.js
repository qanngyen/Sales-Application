import pool from '../data/connection'

const express = require('express')

class PurchaseInvoices {
    constructor(hdn_id, hdn_time, hdn_tt, hdn_thue, ncc_acno, ncc_bname, ncc_brname, ncc_id) {
        this.hdn_id = hdn_id
        this.hdn_time = hdn_time
        this.hdn_tt = hdn_tt
        this.hdn_thue = hdn_thue
        this.ncc_acno = ncc_acno
        this.ncc_bname = ncc_bname
        this.ncc_brname = ncc_brname
        this.ncc_id = ncc_id
    }
    // thêm hóa đơn
    async addPurchaseInvoice(purchaseInvoice) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const request = pool.request()
            request
                .input('hdn_id', purchaseInvoice.hdn_id)
                .input('hdn_time', purchaseInvoice.hdn_time)
                .input('hdn_tt', purchaseInvoice.hdn_tt)
                .input('hdn_thue', purchaseInvoice.hdn_thue)
                .input('ncc_acno', purchaseInvoice.ncc_acno)
                .input('ncc_bname', purchaseInvoice.ncc_bname)
                .input('ncc_brname', purchaseInvoice.ncc_brname)
                .input('ncc_id', purchaseInvoice.ncc_id)
                .ouput('id')
            const result = await request.execute('XuLyHoaDonMua')
            pool.close()
            return {
                message: 'Success',
                data: result
            }
        } catch (error) {
            console.error(error)
        }
    }
    async readPurchaseInvoice (purchaseInvoiceID) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const request = pool.request()
            request.input('HDN_ID', purchaseInvoiceID)
            const result = await request.execute('select * from HOADONNHAP where @hdn_id = @hdn_id')
            pool.close()
            return {
                message: 'Success',
                data: result
            }
        } catch (error) {
            console.error(error)
        }
    }
    async updatePurchaseInvoice(purchaseInvoiceID, valuesUpdateObject){
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const request = pool.request()
            let query_default = 'update HOADONMUA set '
            let query_optional = ''
            let query_condition = ` where HDN_ID = @HDN_ID`
            request.input('id', purchaseInvoiceID)
            Object.keys(valuesUpdateObject).forEach((key, index) => {
                if (index === Object.keys(valuesUpdateObject).length - 1) {
                    query_optional += `${key} = @${key}`
                    request.input(key, valuesUpdateObject[key])
                } else {
                    query_optional += `${key} = @${key}, `
                    request.input(key, valuesUpdateObject[key])
                }
            })
            const full_query = query_default + query_optional + query_condition
            const result = await request.query(full_query)
            pool.close()
            return {
                message: 'Success',
                data: result
            }
        } catch (error) {
            console.error(error)
        }
    }
    async deletePurchaseInvoice(purchaseInvoiceID) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const request = pool.request()
            request.input('HDN_ID', purchaseInvoiceID)
            const result = await request.execute('delete from HOADONBAN where HDN_ID = @HDN_ID')
            pool.close()
            return {
                message: 'Success',
                data: result
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default new PurchaseInvoices