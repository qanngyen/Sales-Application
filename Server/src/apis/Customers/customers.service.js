import customersModel from "../../../model/customers.model";

class CustomerService {
    async customersProcessing(customer) {
        try {
            console.log('Đã vào xử lý dữ liệu khách hàng');
            const result = await customersModel.XuLyCustomer(customer);
            return result
        } catch (error) {
            console.error(`Error:`, error);
        }
    }
    async readingsProcessing(customerID) {
        try {
            console.log('Đã vào xử lý dữ liệu đọc');
            const result = await customersModel.ReadCustomer(customerID)
            return result
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
    async updateCustomerProcessing(customerID, customer) {
        try {
            console.log('Đã vào xử lý dữ liệu cập nhật');
            const result = await customersModel.UpdateCustomer(customerID, customer);
            console.log(result)
            return result
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
    async deleteCustomerProcessing(customerID) {
        try {
            console.log('Đã vào xử lý dữ liệu xóa');
            const result = await customersModel.DeleteCustomer(customerID);
            return result
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
}

export default new CustomerService();