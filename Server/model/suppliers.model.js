import { query } from "express";
import pool from "../data/connection.js";
import sql, { columns, map } from 'mssql/msnodesqlv8';


class SupplierModel {
    // làm hàm khởi tạo để đảm bảo mỗi khi khởi tạo phải truyền vào đủ các giá trị, không bị thiếu
    constructor (id, name, address, phone, fax, web, email) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.web = web;
        this.email = email;
    }
    
    // thêm nhà cung cấp
    async suppliersProcessing(newSupplier) {
        try {
            // const { id, name, address, phone, fax, web, email } = newSupplier;
            console.log(newSupplier)
            const request = pool.request();
            if (!pool.connected) {
                await pool.connect();
            }
            // xử lý được SQL injection
            request .input('NCC_ID', sql.Char(10), newSupplier.id)
                    .input('NCC_Name', sql.NVarChar(100), newSupplier.name)
                    .input('NCC_Ad', sql.NVarChar(100), newSupplier.address)
                    .input('NCC_Phone', sql.Char(11), newSupplier.phone)
                    .input('NCC_Fax', sql.Char(11), newSupplier.fax)
                    .input('NCC_Web', sql.NVarChar(100), newSupplier.web)
                    .input('NCC_Email', sql.VarChar(50), newSupplier.email)
                    .output('ID', sql.Char(10));
            
            // Thực thi stored procedure
            const result = await request.execute('XuLyNhaCungCap');

            console.log('Đã vào được model');
            pool.close()
            return {
                success: true,
                message: 'Xử lý nhà cung cấp xong, có thể thực hiện thêm hóa đơn',
                data: result,
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                success: false,
                message: 'Lỗi khi xử lý nhà cung cấp',
                error: error.message,
            };
        }
    }
    // Xem thông tin nhà cung cấp theo id
    async readSuppliers (supplierID) {
        try {
            console.log('đã vào được read supplier model')
            // query =  'SELECT * FROM NHACUNGCAP WHERE ncc_id = @ncc_id'
            // mở kết nối
            // Mở kết nối và thực hiện truy vấn trong một chuỗi async
            if (!pool.connected) {
                await pool.connect();
            }
            // const result = await pool.request().input(...).query(...); Bản chất là thế này
            const result = await pool.request()
                .input('ncc_id', sql.Char(10), supplierID) // Gán giá trị cho tham số
                .query('SELECT * FROM NHACUNGCAP WHERE ncc_id = @ncc_id'); // Thực hiện truy vấn SQL
            pool.close() 
            return result.recordset[0]
            // đóng kết nối
        } catch(error) {
            console.log('excute query error', error)
        }
    }
    // cập nhật nhà cung cấp theo ID và một Object là columnNameList
    async updateSupplier(supplierID, valuesUpdateObject) {
        try {
            console.log(valuesUpdateObject)

            if (!pool.connected) {
                await pool.connect();
            }

            const query_default = 'update NHACUNGCAP set ' 
            const query_condition = 'where ncc_id = @ncc_id'
            let query_optional = ''
            const keyList = Object.keys(valuesUpdateObject)
            const request = pool.request()
            
            keyList.map(function(key, index) {
                // console.log(key, valuesUpdateObject[key])
                if (index == keyList.length - 1) {
                    query_optional = query_optional + `${key} = @${key} `
                    request
                        .input(key, valuesUpdateObject[key])
                        .input('ncc_id',sql.Char(10), supplierID)
                }
                else {
                    query_optional = query_optional + `${key} = @${key}` + ','
                    request.input(key, valuesUpdateObject[key])
                }             
            })
            
            const full_query = query_default + query_optional + query_condition
            console.log(full_query)
            
            await request.query(full_query)

            return {
                success: true,
                message: 'Cập nhật nhà cung cấp thành công',
            }
        } catch (error) {
            console.log('excute query error', error)
            return {
                success: false,
                message: 'Lỗi khi cập nhật nhà cung cấp',
                error: error.message
            }
        }
    }
    // xóa nhà cung cấp theo ID
    async deleteSupplier (supplierID) {
        try {
            if (!pool.connected) {
                await pool.connect()
            }
            await pool.request().input('ncc_id', supplierID).query('delete from NHACUNGCAP where ncc_id = @ncc_id')
            return {
                success: true,
                message: 'Xóa nhà cung cấp thành công',
            }
        }
        catch (error) {
            console.log('excute query error', error)
            return {
                success: false,
                message: 'Lỗi khi xóa nhà cung cấp',
                error: error.message
            }
        }
    }
}

export default new SupplierModel;
