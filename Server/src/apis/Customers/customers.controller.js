import customersService from "./customers.service";

class CustomerController {
    // thêm customer 
    addCustomerController = async (req, res, next) => {
        try {
            const result = await customersService.addCustomerService(req.body);
            return res.send(result);;
        } catch (error) {
            console.error(error);
        }
    }
    // xem tất cả dữ liệu -- done
    getAllCustomerController =  async (req, res, next) => { 
        try {
            const result = await customersService.getAllCustomersService();
            return res.send(result);
        } catch (error) {
            console.error(error);
        }
    }
    // xem chi tiết dữ liệu theo id -- done
    getCustomerByIdController = async (req, res, next) => {
        try {
            console.log('đã vào controller')
            const result = await customersService.getCustomerByIdService(req.params.id);
            return res.send(result);
        } catch (error) {
            console.error(error);
        }
    }
    // xóa dữ liệu theo id -- done
    deleteCustomerController = async (req, res, next) => {
        try {
            const result = await customersService.deleteCustomerByIdService(req.params.id);
            return res.send(result);
        } catch (error) {
            console.error(error);
        }
    }
    // cập nhật dữ liệu theo id -- done
    updateCustomerController = async (req, res, next) => {
        try {
            const result = await customersService.updateCustomerByIdService(req.body);
            return res.send(result);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new CustomerController();