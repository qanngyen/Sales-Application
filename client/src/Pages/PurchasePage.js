import React from "react";
import '../Styles/PurchasePage.css'
import axios from '../axiosConfig.js'

class PurchasePage extends React.Component {
    state = {
        check: localStorage.getItem('token'),
        supplier: {
            NCC_id: '',
            NCC_name: '',
            NCC_ad: '',
            NCC_phone: '',
            NCC_email: '',
            NCC_fax: '',
            NCC_web: ''
        },
        purchaseInvoices: {
            HDN_time: new Date().toLocaleString(),
            HDN_tt: '',
            HDN_thue: null,
            NCC_acno: '',
            NCC_bname: '',
            NCC_brname: '',
            HDN_tongtienhanghoa: null,
            HDN_tongtienhoadon: null
        },
        purchaseInvoicesDetails: [],
        count: 0
    }

    // bắt sự thay đổi để hiển thị thông tin hóa đơn trên màn hình
    onChangeHandler = (e, index) => {
        if (e.target.id === 'NCC_thue') {
            this.setState({
                supplier: {
                    ...this.state.supplier,
                    NCC_id: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_name') {
            this.setState({
                supplier: {
                   ...this.state.supplier,
                    NCC_name: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_ad') {
            this.setState({
                supplier: {
                   ...this.state.supplier,
                    NCC_ad: e.target.value
                }
            })
        } else if (e.target.id === 'HDN_TT') {
            this.setState({
                purchaseInvoices: {
                   ...this.state.purchaseInvoices,
                    HDN_tt: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_acno') {
            this.setState({
                purchaseInvoices: {
                   ...this.state.purchaseInvoices,
                    NCC_acno: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_phone') {
            this.setState({
                supplier: {
                   ...this.state.supplier,
                    NCC_phone: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_web') {
            this.setState({
                supplier: {
                   ...this.state.supplier,
                    NCC_web: e.target.value
                }
            })
        }  else if (e.target.id === 'NCC_fax') {
            this.setState({
                supplier: {
                   ...this.state.supplier,
                    NCC_fax: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_bname') {
            this.setState({
                purchaseInvoices: {
                   ...this.state.purchaseInvoices,
                    NCC_bname: e.target.value
                }
            })
        } else if (e.target.id === 'NCC_brname') {
            this.setState({
                purchaseInvoices: {
                   ...this.state.purchaseInvoices,
                    NCC_brname: e.target.value
                }
            })
        // phần chi tiết hóa đơn
        } else if (e.target.id === 'HH_id') {
            this.setState({
                purchaseInvoicesDetails: this.state.purchaseInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                           ...item,
                            HH_id: e.target.value
                        }
                    }
                    return item
                })
            })
        } else if (e.target.id === 'HDN_soluong') {
            this.setState({
                purchaseInvoicesDetails: this.state.purchaseInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            HDN_soluong: parseInt(e.target.value)
                        }
                    }
                    return item
                })
            })
        } else if (e.target.id === 'check') {
            this.setState({
                purchaseInvoicesDetails: this.state.purchaseInvoicesDetails.map((item, i) => {
                    if (i === index && e.target.value === true) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            check: 1
                        }
                    } else if (i === index && e.target.value === false) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            check: 0
                        }
                    }
                    return item
                })
            })
        } else if (e.target.id === 'Dongianhap') {
            this.setState({
                purchaseInvoicesDetails: this.state.purchaseInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            Dongianhap: e.target.value
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
            purchaseInvoicesDetails: [...this.state.purchaseInvoicesDetails, {
                HH_id: '',
                HH_name: '',
                Dongianhap: null,
                HDN_soluong: null,
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
        const updatedDetails = [...this.state.purchaseInvoicesDetails];

        // Sử dụng splice để xóa phần tử tại chỉ số index
        updatedDetails.splice(index, 1);
        this.setState({
            purchaseInvoicesDetails: updatedDetails
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
        // api để thực hiện hiển thị hóa đơn mua đúng ra màn hình
        try {
            // Thêm token vào header khi gọi API
            // lấy thông tin chính xác của nhà cung cấp
            console.log(this.state.supplier.NCC_id)
            const supplierRes = await axios.get(`/supplier/${this.state.supplier.NCC_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(supplierRes)

            const allProductRes = [];
            await Promise.all(
                this.state.purchaseInvoicesDetails.map(async (item, index) => {
                    console.log(item.HH_id)
                    const productRes = await axios.get(`/products/${item.HH_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    allProductRes.push({ index, productRes });
                })
            );
            allProductRes.sort((a, b) => a.index - b.index);
            
            console.log(allProductRes);

            let updatedDetails = [...this.state.purchaseInvoicesDetails]
            let tong = 0
            // thay đổi trực tiệp trong mảng update
            for (let i = 0; i < allProductRes.length; i++) {
                updatedDetails[i].HH_name = allProductRes[i].productRes.data.data.recordset[0].HH_Name
                updatedDetails[i].HDN_thanhtien = updatedDetails[i].Dongianhap* updatedDetails[i].HDN_soluong
                tong = tong + updatedDetails[i].HDN_thanhtien 
            }  
            let updatedInvoices = this.state.purchaseInvoices
            console.log(updatedInvoices)
            updatedInvoices.HDN_tongtienhanghoa = tong
            updatedInvoices.HDN_tongtienhoadon = tong - tong*0.1
            updatedInvoices.HDN_thue = 0.1

            this.setState({
                supplier: {
                    ...this.state.supplier,
                    NCC_id: supplierRes.data.data.recordset[0].NCC_ID,
                    NCC_name: supplierRes.data.data.recordset[0].NCC_Name,
                    NCC_ad: supplierRes.data.data.recordset[0].NCC_Ad,
                    NCC_phone: supplierRes.data.data.recordset[0].NCC_Phone,
                    NCC_email: supplierRes.data.data.recordset[0].NCC_Email,
                    NCC_fax: supplierRes.data.data.recordset[0].NCC_Fax,
                    NCC_web: supplierRes.data.data.recordset[0].NCC_Web
                },
                purchaseInvoicesDetails: updatedDetails,
                purchaseInvoices: updatedInvoices
            });
            console.log(updatedInvoices);
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
            // Xử lý nhà cung cấp
            const supplier = {
                NCC_id: this.state.supplier.Cust_id,
                Cust_name: this.state.supplier.Cust_name,
                Cust_ad: this.state.supplier.Cust_ad,
                NCC_phone: this.state.supplier.NCC_phone,
                NCC_email: this.state.supplier.NCC_email,
                NCC_fax: this.state.supplier.NCC_fax,
                NCC_web: this.state.supplier.NCC_web
            };
            const resultOfSubmitCustomer = await axios.post(`/customer/`, 
                supplier, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitCustomer)

            // Xử lý hóa đơn nhập
            const purchaseInvoices = {
                HDN_tt: this.state.purchaseInvoices.HDN_tt,
                HDN_thue: this.state.purchaseInvoices.HDN_thue,
                NCC_acno: this.state.purchaseInvoices.NCC_acno,
                NCC_id: this.state.supplier.NCC_id,
                NCC_bname: this.state.purchaseInvoices.NCC_bname,
                NCC_brname: this.state.purchaseInvoices.NCC_brname
            }
            const resultOfSubmitSalesInvoices = await axios.post(`/purchaseInvoices/`, 
                purchaseInvoices, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitSalesInvoices)
            // lấy HDB_id từ kết quả trả về
            const HDN_id = resultOfSubmitSalesInvoices.data.data.output.ID
            // Xử lý chi tiết hóa đơn
            const purchaseInvoicesDetails = this.state.purchaseInvoicesDetails.map((item) => {
                return {
                    ...item,
                    HDN_id: HDN_id // truyền hóa đơn bán vào đây
                }
            })

            const resultOfSubmitSalesInvoicesDetails = await axios.post(`/purchaseInvoicesDetails/`, 
                purchaseInvoicesDetails, {headers: { Authorization: `Bearer ${token}` }}
            );

            console.log(resultOfSubmitSalesInvoicesDetails)
            alert('Tạo hóa đơn thành công!');
            this.setState({
                check: localStorage.getItem('token'),
                supplier: {
                    NCC_id: '',
                    NCC_name: '',
                    NCC_ad: ''
                },
                salesInvoices: {
                    HDN_time: new Date().toLocaleString(),
                    HDN_tt: '',
                    HDN_thue: null,
                    NCC_acno: '',
                    NCC_ddname: '',
                    NCC_id: '',
                    HDN_tongtienhanghoa: null,
                    HDN_tongtienhoadon: null
                },
                purchaseInvoicesDetails: [],
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
                                <h5>Thông tin nhà cung cấp</h5>
                                <div>
                                    <label htmlFor="">Mã số thuế</label>
                                    <input type="text" id="NCC_thue" value={this.state.supplier.NCC_id} onChange={this.onChangeHandler}/>
                                    <label htmlFor="">Tên đơn vị</label>
                                    <input type="text" id="NCC_name" value={this.state.supplier.NCC_name} onChange={this.onChangeHandler}/>
                                    <label htmlFor="">Địa chỉ đơn vị</label>
                                    <input type="text" id="NCC_ad" value={this.state.supplier.NCC_ad} onChange={this.onChangeHandler}/>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="">Website</label>
                                    <input type="text" id="NCC_web" value={this.state.supplier.NCC_web} onChange={this.onChangeHandler}/>
                                    <label htmlFor="">Số fax</label>
                                    <input type="text" id="NCC_fax" value={this.state.supplier.NCC_fax} onChange={this.onChangeHandler}/>
                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="text" id="NCC_phone" value={this.state.supplier.NCC_phone} onChange={this.onChangeHandler}/>
                                </div>
                                <h5>Chi tiết hóa đơn mua hàng</h5>
                                <div className="abc">
                                    {
                                        Array.from({ length: this.state.count }).map((_, index) => {
                                        // this.state.salesInvoicesDetails.map((item, index) => {
                                            // console.log(index)
                                            return (
                                                <div className="productAdd" key={index}>
                                                    <label htmlFor="">Mã sản phẩm</label>
                                                    <input type="text" id="HH_id" value={this.state.purchaseInvoicesDetails[index]?.HH_id || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <label htmlFor="">Số lượng</label>
                                                    <input type="text" id="HDN_soluong" value={this.state.purchaseInvoicesDetails[index]?.HDN_soluong || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <label htmlFor="">Đơn giá nhập</label>
                                                    <input type="text" id="Dongianhap" value={this.state.purchaseInvoicesDetails[index]?.Dongianhap || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <label htmlFor="">Sản phẩm mới</label>
                                                    <input type="checkbox" id="check" value={this.state.purchaseInvoices[index]?.check || false} onchange={(e) => this.onChangeHandler(e, index)}/>
                                                    <button className="deleteProduct" onClick={(e) => this.onClickDeleteProduct(e, index)}>Xóa</button>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                                <button onClick={this.onClickToAddProduct}>Thêm sản phẩm</button>
                                <h5>Thông tin chung</h5>
                                <label htmlFor="">Phương thức thanh toán</label>
                                <select name="" id="HDN_TT" onChange={this.onChangeHandler} value={this.state.purchaseInvoices.HDN_tt}>
                                    <option value="Tiền mặt">Tiền mặt</option>
                                    <option value="Chuyển khoản">Chuyển khoản</option>
                                </select>
                                <label htmlFor="">Số tài khoản</label>
                                <input type="text" id="NCC_acno" onChange={this.onChangeHandler} value={this.state.purchaseInvoices.NCC_acno}/>
                                <label htmlFor="">Ngân hàng</label>
                                <input type="text" id="NCC_bname" onChange={this.onChangeHandler} value={this.state.purchaseInvoices.NCC_bname}/>
                                <label htmlFor="">Chi nhánh</label>
                                <input type="text" id="NCC_brname" onChange={this.onChangeHandler} value={this.state.purchaseInvoices.NCC_brname}/>
                                
                            </form>
                            <button className="closePopupBtn" onClick={this.closePopup}>TẠO</button>
                        </div>
                    </div>
                    {/* Màn chính */}
                    <div className="siteContainer">
                        <h2>THÔNG TIN HÓA ĐƠN NHẬP</h2>
                        <div className="block">
                            <div className="supplierInf">
                                <p>Mã số thuế: <span>{this.state.supplier.NCC_id}</span></p>
                                <p>Tên đơn vị: <span>{this.state.supplier.NCC_name}</span></p>
                                <p>Địa chỉ đơn vị: <span>{this.state.supplier.NCC_ad}</span></p>
                                <p>Email: <span>{this.state.supplier.NCC_email}</span></p>
                            </div>
                            <div className="supplierInf">
                                <p>Số điện thoại: <span>{this.state.supplier.NCC_phone}</span></p>
                                <p>Số fax: <span>{this.state.supplier.NCC_fax}</span></p>
                                <p>Trang web: <span>{this.state.supplier.NCC_web}</span></p>
                            </div>
                        </div>
                        <div className="block">
                            <div className="purchaseInvoicesDetailInf">
                                {
                                    this.state.purchaseInvoicesDetails.map(item => {
                                        return (
                                            <div className="productInf">
                                                <p>Mã sản phẩm: <span>{item.HH_id}</span></p>
                                                <p>Tên sản phẩm: <span>{item.HH_name}</span></p>
                                                <p>Số lượng: <span>{item.HDN_soluong}</span></p>
                                                <p>Đơn giá nhập: <span>{item.Dongianhap}</span></p>
                                                <p>Thành tiền: <span>{item.HDN_thanhtien}</span></p>
                                            </div>
                                        )  
                                    })
                                }
                            </div>
                        </div>
                        <div className="block">
                            <div className="purchaseInvoicesInf">
                                <div>
                                    <p>Thời gian: <span>{this.state.purchaseInvoices.HDN_time}</span></p>
                                    <p>Phương thức thanh toán: <span>{this.state.purchaseInvoices.HDN_tt}</span></p>
                                    
                                </div>
                                <div>
                                    <p>Ngân hàng: <span>{this.state.purchaseInvoices.NCC_bname}</span></p>
                                    <p>Chi nhanh: <span>{this.state.purchaseInvoices.NCC_brname}</span></p>
                                    <p>Số tài khoản: <span>{this.state.purchaseInvoices.NCC_acno}</span></p>
                                </div>
                                <div>
                                    <p>Tổng tiền hàng hóa: <span>{this.state.purchaseInvoices.HDN_tongtienhanghoa}</span></p>
                                    <p>Tiền thuế hàng hóa: <span>{this.state.purchaseInvoices.HDN_thue}</span></p>
                                    <p>Tổng tiền hóa đơn: <span>{this.state.purchaseInvoices.HDN_tongtienhoadon}</span></p>
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

export default PurchasePage;