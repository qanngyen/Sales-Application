import React from "react";
import '../Styles/PaymentPage.css'
import SideBar from "../Component/SideBar";
import axios from '../axiosConfig.js'

class PaymentPage extends React.Component {
    state = {
        check: localStorage.getItem('token'),
        customer: {
            Cust_id: '',
            Cust_name: '',
            Cust_ad: ''
        },
        salesInvoices: {
            HDB_time: new Date().toLocaleString(),
            HDB_tt: '',
            HDB_thue: null,
            Cust_acno: '',
            Cust_ddname: '',
            Cust_id: '',
            HDB_tongtienhanghoa: null,
            HDB_tongtienhoadon: null
        },
        salesInvoicesDetails: [],
        count: 0
    }

    // bắt sự thay đổi để hiển thị thông tin hóa đơn trên màn hình
    onChangeHandler = (e, index) => {
        if (e.target.id === 'Cust_thue') {
            this.setState({
                customer: {
                    ...this.state.customer,
                    Cust_id: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_name') {
            this.setState({
                customer: {
                   ...this.state.customer,
                    Cust_name: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_ad') {
            this.setState({
                customer: {
                   ...this.state.customer,
                    Cust_ad: e.target.value
                }
            })
        } else if (e.target.id === 'HDB_TT') {
            this.setState({
                salesInvoices: {
                   ...this.state.salesInvoices,
                    HDB_tt: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_ddname') {
            this.setState({
                salesInvoices: {
                   ...this.state.salesInvoices,
                    Cust_ddname: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_acno') {
            this.setState({
                salesInvoices: {
                   ...this.state.salesInvoices,
                    Cust_acno: e.target.value
                }
            })
        // phần chi tiết hóa đơn
        } else if (e.target.id === 'HH_id') {
            this.setState({
                salesInvoicesDetails: this.state.salesInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                           ...item,
                            HH_id: e.target.value
                        }
                    }
                    return item
                })
            })
        } else if (e.target.id === 'HDB_soluong') {
            this.setState({
                salesInvoicesDetails: this.state.salesInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            HDB_soluong: parseInt(e.target.value)
                        }
                    }
                    return item
                })
            })
        }
    }
    onClickToAddProduct = (e) => {
        // chặn sự kiện reload
        e.preventDefault()
        this.setState({
            count: this.state.count + 1,
            salesInvoicesDetails: [...this.state.salesInvoicesDetails, {
                HH_id: '',
                HH_name: '',
                Dongiaban: null,
                HDB_soluong: null,
                HDB_thanhtien: null
            }]
        })
    }

    onClickDeleteProduct = (e, index) => {
        e.preventDefault()
        const parentElement = e.target.closest("div"); // bắt đầu từ target tìm phần tử cha div
        if (parentElement) {
            parentElement.remove(); // xóa khỏi DOM element
        }
        // Tạo một bản sao của mảng salesInvoicesDetails
        const updatedDetails = [...this.state.salesInvoicesDetails];

        // Sử dụng splice để xóa phần tử tại chỉ số index
        updatedDetails.splice(index, 1);
        this.setState({
            salesInvoicesDetails: updatedDetails
        });
    }

    // thực hiện call api để lấy đúng dữ liệu theo mã 
    closePopup = async () => {
        const popupContainer = document.getElementsByClassName('popupContainer')[0];
        if (popupContainer) {
            popupContainer.classList.add('hidden');
        }
    
        // Lấy token từ localStorage (hoặc nguồn khác nếu cần)
        const token = localStorage.getItem('token'); // `token` cần trùng với giá trị `VALID_TOKEN` trong middleware.
    
        if (!token) {
            console.error("Token is missing!");
            return;
        }
    
        try {
            // Thêm token vào header khi gọi API
            const customerRes = await axios.get(`/customer/${this.state.customer.Cust_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const allProductRes = [];
            await Promise.all(
                this.state.salesInvoicesDetails.map(async (item, index) => {
                    console.log(item.HH_id)
                    const productRes = await axios.get(`/products/${item.HH_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    allProductRes.push({ index, productRes });
                })
            );
            allProductRes.sort((a, b) => a.index - b.index);
            const {Cust_Ad, Cust_ID, Cust_name} = customerRes.data.data[0]
            let updatedDetails = [...this.state.salesInvoicesDetails]
            let tong = 0
            // thay đổi trực tiệp trong mảng update
            for (let i = 0; i < allProductRes.length; i++) {
                updatedDetails[i].HH_name = allProductRes[i].productRes.data.data.recordset[0].HH_Name
                updatedDetails[i].Dongiaban = allProductRes[i].productRes.data.data.recordset[0].GiaBanMacDinh
                updatedDetails[i].HDB_thanhtien = allProductRes[i].productRes.data.data.recordset[0].GiaBanMacDinh* updatedDetails[i].HDB_soluong
                tong = tong + updatedDetails[i].HDB_thanhtien 
            }  
            let updatedInvoices = this.state.salesInvoices
            updatedInvoices.HDB_tongtienhanghoa = tong
            updatedInvoices.HDB_tongtienhoadon = tong - tong*0.1
            updatedInvoices.HDB_thue = 0.1
            this.setState({
                customer: {
                    Cust_id: Cust_ID,
                    Cust_name: Cust_name,
                    Cust_ad: Cust_Ad
                },
                salesInvoicesDetails: updatedDetails,
                salesInvoices: updatedInvoices
            });
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
        }
    };
    // hiển thị pop up form thông tin hóa đơn
    createOrder = () => {
        const popupContainer = document.getElementsByClassName('popupContainer')[0];
        if (popupContainer) {
            popupContainer.classList.remove('hidden');
        }
    }

    // submit hóa đơn cập nhật vào cơ sở dữ liệu
    submitInvoices = async () => {
        // Lấy token từ localStorage (hoặc nguồn khác nếu cần)
        const token = localStorage.getItem('token'); // `token` cần trùng với giá trị `VALID_TOKEN` trong middleware.
    
        if (!token) {
            console.error("Token is missing!");
            return;
        }
        try {
            // Xử lý khách hàng
            const customer = {
                Cust_id: this.state.customer.Cust_id,
                Cust_name: this.state.customer.Cust_name,
                Cust_ad: this.state.customer.Cust_ad,
            };
            const resultOfSubmitCustomer = await axios.post(`/customer/`, 
                customer, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitCustomer)

            // Xử lý hóa đơn
            const salesInvoices = {
                Cust_id: this.state.customer.Cust_id,
                HDB_tt: this.state.salesInvoices.HDB_tt,
                HDB_thue: 10,
                Cust_acno: this.state.salesInvoices.Cust_acno,
                Cust_ddname: this.state.salesInvoices.Cust_ddname
            }
            const resultOfSubmitSalesInvoices = await axios.post(`/salesinvoices/`, 
                salesInvoices, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitSalesInvoices)
            // lấy HDB_id từ kết quả trả về
            const HDB_id = resultOfSubmitSalesInvoices.data.data.output.ID
            // Xử lý chi tiết hóa đơn
            const salesInvoicesDetails = this.state.salesInvoicesDetails.map((item) => {
                return {
                    ...item,
                    HDB_id: HDB_id // truyền hóa đơn bán vào đây
                }
            })

            const resultOfSubmitSalesInvoicesDetails = await axios.post(`/salesinvoicesdetails/`, 
                salesInvoicesDetails, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitSalesInvoicesDetails)
            alert('Tạo hóa đơn thành công!');
            this.setState({
                check: localStorage.getItem('token'),
                customer: {
                    Cust_id: '',
                    Cust_name: '',
                    Cust_ad: ''
                },
                salesInvoices: {
                    HDB_time: new Date().toLocaleString(),
                    HDB_tt: '',
                    HDB_thue: null,
                    Cust_acno: '',
                    Cust_ddname: '',
                    Cust_id: '',
                    HDB_tongtienhanghoa: null,
                    HDB_tongtienhoadon: null
                },
                salesInvoicesDetails: [],
                count: 0
            })
        } catch (error) {
            alert('Tạo hóa đơn thất bại!');
            console.error("Error fetching data:", error.response?.data || error.message);
        }
    }
    render() {
        if (this.state.check === 'your-unique-token') {
            return (
                // container lắp đầy
                <div className="site">
                    {/* pop up */}
                    <div className="popupContainer hidden">
                        <div className="popup">
                            <form action="">
                                <h5>Thông tin khách mua hàng</h5>
                                <label htmlFor="">Mã số thuế</label>
                                <input type="text" id="Cust_thue" value={this.state.customer.Cust_id} onChange={this.onChangeHandler}/>
                                <label htmlFor="">Tên đơn vị</label>
                                <input type="text" id="Cust_name" value={this.state.customer.Cust_name} onChange={this.onChangeHandler}/>
                                <label htmlFor="">Địa chỉ đơn vị</label>
                                <input type="text" id="Cust_ad" value={this.state.customer.Cust_ad} onChange={this.onChangeHandler}/>
                                <h5>Chi tiết hóa đơn mua hàng</h5>
                                <div className="abc">
                                    {
                                        Array.from({ length: this.state.count }).map((_, index) => {
                                        // this.state.salesInvoicesDetails.map((item, index) => {
                                            // console.log(index)
                                            return (
                                                <div className="productAdd" key={index}>
                                                    <label htmlFor="">Mã sản phẩm</label>
                                                    <input type="text" id="HH_id" value={this.state.salesInvoicesDetails[index]?.HH_id || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <label htmlFor="">Số lượng</label>
                                                    <input type="text" id="HDB_soluong" value={this.state.salesInvoicesDetails[index]?.HDB_soluong || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <button className="deleteProduct" onClick={(e) => this.onClickDeleteProduct(e, index)}>Xóa</button>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                                <button onClick={this.onClickToAddProduct}>Thêm sản phẩm</button>
                                <h5>Thông tin chung</h5>
                                <label htmlFor="">Phương thức thanh toán</label>
                                <select name="" id="HDB_TT" onChange={this.onChangeHandler} value={this.state.salesInvoices.HDB_tt}>
                                    <option value="Tiền mặt">Tiền mặt</option>
                                    <option value="Chuyển khoản">Chuyển khoản</option>
                                </select>
                                <label htmlFor="">Người đại diện</label>
                                <input type="text" id="Cust_ddname" onChange={this.onChangeHandler} value={this.state.salesInvoices.Cust_ddname}/>
                                <label htmlFor="">Số tài khoản</label>
                                <input type="text" id="Cust_acno" onChange={this.onChangeHandler} value={this.state.salesInvoices.Cust_acno}/>
                            </form>
                            <button className="closePopupBtn" onClick={this.closePopup}>TẠO</button>
                        </div>
                    </div>
                    {/* Màn chính */}
                    <div className="siteContainer">
                        <h2>THÔNG TIN HÓA ĐƠN BÁN</h2>
                        <div className="block">
                            <div className="customerInf">
                                <p>Mã số thuế: <span>{this.state.customer.Cust_id}</span></p>
                                <p>Tên đơn vị: <span>{this.state.customer.Cust_name}</span></p>
                                <p>Địa chỉ đơn vị: <span>{this.state.customer.Cust_ad}</span></p>
                            </div>
                        </div>
                        <div className="block">
                            <div className="salesInvoicesDetailInf">
                                {
                                    this.state.salesInvoicesDetails.map(item => {
                                        return (
                                            <div className="productInf">
                                                <p>Mã sản phẩm: <span>{item.HH_id}</span></p>
                                                <p>Tên sản phẩm: <span>{item.HH_name}</span></p>
                                                <p>Số lượng: <span>{item.HDB_soluong}</span></p>
                                                <p>Đơn giá bán: <span>{item.Dongiaban}</span></p>
                                                <p>Thành tiền: <span>{item.HDB_thanhtien}</span></p>
                                            </div>
                                        )  
                                    })
                                }
                            </div>
                        </div>
                        <div className="block">
                            <div className="salesInvoicesInf">
                                <div>
                                    <p>Thời gian: <span>{this.state.salesInvoices.HDB_time}</span></p>
                                    <p>Phương thức thanh toán: <span>{this.state.salesInvoices.HDB_tt}</span></p>
                                    <p>Người đại diện: <span>{this.state.salesInvoices.Cust_ddname}</span></p>
                                    <p>Số tài khoản: <span>{this.state.salesInvoices.Cust_acno}</span></p>
                                </div>
                                <div>
                                    <p>Tổng tiền hàng hóa: <span>{this.state.salesInvoices.HDB_tongtienhanghoa}</span></p>
                                    <p>Tiền thuế hàng hóa: <span>{this.state.salesInvoices.HDB_thue}</span></p>
                                    <p>Tổng tiền hóa đơn: <span>{this.state.salesInvoices.HDB_tongtienhoadon}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="blockbtn">
                            <div>
                                <button className="create" onClick={this.createOrder}>TẠO HÓA ĐƠN</button>
                                <button className="edit" onClick={this.createOrder}>CHỈNH SỬA</button>
                            </div>
                            <div><button className="submit" onClick={this.submitInvoices}>XÁC NHẬN</button></div>
                        </div>
                    
                    </div>
                </div>
            );
        }
        else {
            window.location.href = '/'
        }
    }
}

export default PaymentPage;