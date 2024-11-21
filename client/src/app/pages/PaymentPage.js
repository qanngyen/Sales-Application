import React from "react";
import GeneralPage from "./GeneralPage";

class PaymentPage extends GeneralPage  {
    // Các thuộc tính, các hàm khác xử lý trên này
    
    
    // phương thức để render ra dữ liệu
    render() {
        return (
            <div>
                <h1>Welcome to Payment Page</h1>
                <p>This is the payment page of the application.</p>
            </div>
        );
    }
}

export default new PaymentPage();

