import pool from "../data/connection";

class purchaseInvoicesDetails {
    // Xem chi tiết hóa đơn bán by id của hóa đơn mua
    async getPurchaseInvoiceDetailsById(purchaseInvoicesDetailsId) {
        try {
            await pool.connect()
            const result = await pool.request().input("input", purchaseInvoicesDetailsId).query('select * from CHITIETHOADONMUA where HDN_id = @input')
            return {
                message: "success to get purchase invoice details by id invoice",
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: "Fail to get purchase invoice details by id invoice",
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // thêm chi tiết hóa đơn mua
    async addPurchaseInvoiceDetails(purchaseInvoiceDetailsArray) {
        try {
            const results = []
            await pool.connect()
            for (let purchaseInvoiceDetails of purchaseInvoiceDetailsArray) {
                console.log(purchaseInvoiceDetails)
                const result = await pool.request()
                    .input('HH_ID', purchaseInvoiceDetails.HH_id)
                    .input('HH_Name', purchaseInvoiceDetails.HH_name)
                    .input('DVT', purchaseInvoiceDetails.Dvt)
                    .input('HDN_ID', purchaseInvoiceDetails.HDN_id)
                    .input('HDN_soluong', purchaseInvoiceDetails.HDN_soluong)
                    .input('Dongianhap', purchaseInvoiceDetails.Dongianhap)
                    .input('check', purchaseInvoiceDetails.Check)
                    .execute('sp_XuLyThemHangHoa')
                console.log(result)
                results.push(result)
                // if (result.status)
            }
            return {
                message: "success to add purchase invoice details",
                data: results
            }
        } catch (error) {
            console.error(error)
            return {
                message: "Fail to add purchase invoice details",
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // sửa chi tiết hóa đơn mua
    async updatePurchaseInvoiceDetails(purchaseInvoiceDetails) {
        try {
            await pool.connect()
            const result = await pool.request()
                .input('HH_ID', purchaseInvoiceDetails.HH_id)
                .input('HDN_ID', purchaseInvoiceDetails.HDN_id)
                .input('HDN_soluong', purchaseInvoiceDetails.HDN_soluong)
                .input('Dongianhap', purchaseInvoiceDetails.Dongianhap)
                .input('HH_ID_update', purchaseInvoiceDetails.HH_id_update)
                .execute('updateChiTietHoaDonMua')
            return {
                message: "success to update purchase invoice details",
                data: results
            }
        } catch (e) {
            console.error(e)
            return {
                message: "Fail to update purchase invoice details",
                data: null
            }
        } finally {
            pool.close()
        }
    }
    // xóa chi tiết hóa đơn mua
    async deletePurchaseInvoiceDetails(purchaseInvoiceDetailsId) {
        try {
            await pool.connect()
            const result = await pool.request()
                .input('HH_id', purchaseInvoiceDetailsId.HH_id)
                .input('HDN_id', purchaseInvoiceDetailsId.HDN_id)
                .query('delete from ChiTietHoaDonMua where HH_ID = @HH_id and HDN_ID = @HDN_id')
            return {
                message: "success to delete purchase invoice details",
                data: result
            }
        } catch (error) {
            console.error(error)
            return {
                message: "Fail to delete purchase invoice details",
                data: null
            }
        } finally {
            pool.close()
        }
    }
}

export default new purchaseInvoicesDetails()