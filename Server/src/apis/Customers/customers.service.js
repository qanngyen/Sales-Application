import customersModel from "../../../model/customers.model";

class CustomersService {
    // thêm dữ liệu
    async addCustomerService(customer) {
        try {
            const result = await customersModel.addCustomer(customer)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    // xem tất cả
    async getAllCustomersService() {
        try {
            const result = await customersModel.getAllCustomers()
            return result
        } catch (err) {
            console.log(err)
        }
    }
    // xem theo id
    async getCustomerByIdService(customerID) {
        try {
            console.log('đã vào được service')
            const result = await customersModel.getCustomerById(customerID)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    // sửa theo id
    async updateCustomerByIdService(customer) {
        try {
            const result = await customersModel.updateCustomerById(customer)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    // xóa theo id
    async deleteCustomerByIdService(customerID) {
        try {
            const result = await customersModel.deleteCustomerById(customerID)
            return result
        } catch (err) {
            console.log(err)
        }
    }
}

export default new CustomersService();