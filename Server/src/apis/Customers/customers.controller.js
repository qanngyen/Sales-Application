import customersService from "./customers.service";

class CustomerControler {
    xuLyCustomer = async (req, res, next) => {
        // check dữ liệu đầu vào
        try {
            const result = await customersService.customersProcessing(req.body);
            return res.status(200).json({
                message: 'Thành công',
                data: result
            });
        } catch (error) {
            console.error(`Error:`, error);
        }
    }
    readingCustomer = async (req, res, next) => {
        try
        {
            const result = await customersService.readingsProcessing(req.params.id);
            return res.status(200).json({
                message: 'Thành công',
                data: result
            });
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
    updatingCustomer = async (req, res, next) => {
        try
        {
            const result = await customersService.updateCustomerProcessing(req.params.id, req.body);
            return res.status(200).json({
                message: 'Thành công',
                data: result
            });
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
    deleteCustomer = async (req, res, next) => {
        try
        {
            const result = await customersService.deleteCustomerProcessing(req.params.id);
            return res.status(200).json({
                message: 'Thành công',
                data: result
            });
        }
        catch (error) {
            console.error(`Error:`, error);
        }
    }
}

export default new CustomerControler();

