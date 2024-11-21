import pool from '../data/connection.js'

// đưa mã hóa xuống Database vì sử dụng mã hóa 2 chiều
class customerModel {
    constructor (id, name, ddname, ad) {
        this.id = id,
        this.name = name,
        this.ddname = ddname,
        this.ad = ad
    }
    // thêm customer
    async XuLyCustomer(customer) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const request = await pool.request()
            request .input('Cust_ID', customer.id)
                    .input('Cust_name', customer.name)
                    .input('Cust_DDName', customer.ddname)
                    .input('Cust_Ad', customer.ad)
                    .output('ID')
            const result = await request.execute('XuLyCustomer');
            const ID = result.output.ID;
            console.log(ID);
            pool.close()
            return result
        } catch (error) {
            console.error(error)
            return {
                message: 'Failed to add customer'
            }
        }
    }
    // xem customer 
    async ReadCustomer(customerID) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const result = await pool.request()
                .input('Cust_ID', customerID)
                .query('Select * from customer where Cust_ID = @Cust_ID')
            console.log(result)
            return result
        } catch(error) {
            console.error(error)
            return {
                message: 'Failed to read customer'
            }
        } finally {
            pool.close()
        }
    }
    // sửa customer
    async UpdateCustomer(customerID, valuesUpdateObject) {
        try {
            if (!pool.connected) {
                await pool.connect();
            }
            const query_default = 'update customer set '
            const query_condition =' where Cust_ID = @Cust_ID'
            let query_optional = ''
            const keyList = Object.keys(valuesUpdateObject)
            const request = pool.request()
            request.input('Cust_ID', customerID)
            keyList.map(function (key, index) {
                if (keyList.length - 1 === index) {
                    query_optional = query_optional + `${key} = @${key} `
                    request.input(key, valuesUpdateObject[key])
                } else {
                    query_optional = query_optional + `${key} = @${key}, `
                    request.input(key, valuesUpdateObject[key])
                }
            })
            const full_query = query_default + query_optional + query_condition
            console.log(full_query)
            const result = await request.query(full_query)
            return result
        } catch (error) {
            console.error(error)
        } finally {
            pool.close()
        }
    }
    // xóa customer
    async DeleteCustomer(customerID) {
        try { 
            if (!pool.connected) {
                await pool.connect();
            }
            const request = pool.request()
            request.input('Cust_ID', customerID)
            const result = await request.query('Delete from customer where Cust_ID = @Cust_ID')
            console.log('Xóa thành công')
            return result
        } catch (error) { 
            console.error(error)
        } finally {
            pool.close()
        }
    }
}

export default new customerModel