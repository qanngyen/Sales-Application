import React from "react";
import '../Styles/SalesInvoicesPage.css'
import axios from '../axiosConfig.js'


class SalesInvoices extends React.Component {
    state = {
        salesInvoices: [],
        editInf: 
            {
                Cust_id: '',
                Cust_name: '',
                Cust_ad: '',
                HDB_time: '',
                HDB_tt: '',
                HDB_thue: null,
                Cust_acno: '',
                Cust_ddname: '',
                salesInvoicesDetails: [],
            }
    }
    
    async componentDidMount() {
        try {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
            const response = await axios.get("/salesinvoices", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.data.recordset);
            this.setState({
                salesInvoices: response.data.data.recordset, // Cập nhật dữ liệu vào state
                loading: false, // Đánh dấu đã tải xong dữ liệu
            });
            } catch (error) {
                this.setState({
                    error: "Không thể tải dữ liệu hóa đơn bán.",
                    loading: false,
                });
            }
        } 
    handleDeleteSalesInvoice = async (e, id) => {
        const token = localStorage.getItem('token'); // `token` cần trùng với giá trị `VALID_TOKEN` trong middleware.
    
        if (!token) {
            console.error("Token is missing!");
            return;
        }
        try {
            const result = await axios.delete(`/salesinvoices/${id}`, 
                {headers: { Authorization: `Bearer ${token}` }}
            );
            console.log(result);
            this.setState((prevState) => ({
                salesInvoices: prevState.salesInvoices.filter((invoice) => invoice.HDB_ID !== id),
            }));
        } catch (error) {
            console.log(error);
        }
    } 
    onChangeHandler = (e, index) => {
        if (e.target.id === 'Cust_thue') {
            this.setState({
                editInf: {
                    ...this.state.editInf,
                    Cust_id: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_name') {
            this.setState({
                editInf: {
                   ...this.state.editInf,
                    Cust_name: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_ad') {
            this.setState({
                editInf: {
                   ...this.state.editInf,
                    Cust_ad: e.target.value
                }
            })
        } else if (e.target.id === 'HDB_TT') {
            this.setState({
                editInf: {
                   ...this.state.editInf,
                    HDB_tt: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_ddname') {
            this.setState({
                editInf: {
                   ...this.state.editInf,
                    Cust_ddname: e.target.value
                }
            })
        } else if (e.target.id === 'Cust_acno') {
            this.setState({
                editInf: {
                   ...this.state.editInf,
                    Cust_acno: e.target.value
                }
            })
        // phần chi tiết hóa đơn
        } else if (e.target.id === 'HH_id') {
            this.setState({
                editInf: {salesInvoicesDetails: this.state.salesInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                           ...item,
                            HH_id: e.target.value
                        }
                    }
                    return item
                })
            }})
        } else if (e.target.id === 'HDB_soluong') {
            this.setState({
                editInf: {salesInvoicesDetails: this.state.salesInvoicesDetails.map((item, i) => {
                    if (i === index) {
                        return {
                            // sao chép tất cả các thuộc tính của phần tử hiện tại
                            ...item,
                            HDB_soluong: parseInt(e.target.value)
                        }
                    }
                    return item
                })
            }})
        }
    }
    handleEditSalesInvoice = async () => {
        const token = localStorage.getItem('token'); // `token` cần trùng với giá trị `VALID_TOKEN` trong middleware.
        const popupContainer = document.getElementsByClassName('popupContainerAbc')[0];
        if (popupContainer) {
            popupContainer.classList.remove('hidden');
        }
        // call api lấy ra chi tiết hóa đơn, hóa đơn, khách hàng
        

    }

    closePopup = async () => {
        const popupContainer = document.getElementsByClassName('popupContainerAbc')[0];
        if (popupContainer) {
            popupContainer.classList.add('hidden');
        }

        // call api cập nhật thay đổi vào cơ sở dữ liệu

    }

    render() {
        return (
            <div className="siteInvoices">
                <h2>Hóa đơn bán</h2>
                <div className="popupContainerAbc hidden">
                    <div className="popupAbc">
                        <form action="">
                            <h5>Thông tin khách mua hàng</h5>
                                <label htmlFor="">Mã số thuế</label>
                                <input type="text" id="Cust_thue" value={this.state.editInf.Cust_id} onChange={this.onChangeHandler}/>
                                <label htmlFor="">Tên đơn vị</label>
                                <input type="text" id="Cust_name" value={this.state.editInf.Cust_name} onChange={this.onChangeHandler}/>
                                <label htmlFor="">Địa chỉ đơn vị</label>
                                <input type="text" id="Cust_ad" value={this.state.editInf.Cust_ad} onChange={this.onChangeHandler}/>
                                <h5>Chi tiết hóa đơn mua hàng</h5>
                                <div className="abc">
                                    {
                                        this.state.editInf.salesInvoicesDetails.map((item, index) => {
                                            // this.state.salesInvoicesDetails.map((item, index) => {
                                            // console.log(index)
                                            return (
                                                <div className="productAdd" key={index}>
                                                    <label htmlFor="">Mã sản phẩm</label>
                                                    <input type="text" id="HH_id" value={this.state.editInf.salesInvoicesDetails[index]?.HH_id || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <label htmlFor="">Số lượng</label>
                                                    <input type="text" id="HDB_soluong" value={this.state.editInf.salesInvoicesDetails[index]?.HDB_soluong || ""} onChange={(e) => this.onChangeHandler(e,index)}/>
                                                    <button className="deleteProduct" onClick={(e) => this.onClickDeleteProduct(e, index)}>Xóa</button>
                                                </div> 
                                                )
                                            })
                                    }
                                </div>
                                <h5>Thông tin chung</h5>
                                <label htmlFor="">Phương thức thanh toán</label>
                                <select name="" id="HDB_TT" onChange={this.onChangeHandler} value={this.state.editInf.HDB_tt}>
                                    <option value="Tiền mặt">Tiền mặt</option>
                                    <option value="Chuyển khoản">Chuyển khoản</option>
                                </select>
                                <label htmlFor="">Người đại diện</label>
                                <input type="text" id="Cust_ddname" onChange={this.onChangeHandler} value={this.state.editInf.Cust_ddname}/>
                                <label htmlFor="">Số tài khoản</label>
                                <input type="text" id="Cust_acno" onChange={this.onChangeHandler} value={this.state.editInf.Cust_acno}/>
                        </form>
                        <button className="closePopupBtn" onClick={this.closePopup}>XÁC NHẬN</button>
                </div>
            </div>
                                
                {
                    this.state.salesInvoices.map((item, index) => {
                        return (
                            <div className="invoices">
                                <p>Mã hóa đơn: <br /> {item.HDB_ID}</p>
                                <p>Mã số thuế: <br /> {item.Cust_ID}</p>
                                <p>Đại diện: <br />{item.Cust_DDName}</p>
                                <p>Thanh toán: <br /> {item.HDB_TT}</p>
                                <p>Số tài khoản: <br /> {item.Cust_AcNo}</p>
                                <p>Thuế: {item.HDB_Thue}</p>
                                <p>Ngày xuất hóa đơn: <br />{new Date(item.HDB_Time).toISOString().slice(0, 10) }</p>
                                <button className="deletebtn" onClick={(e) => this.handleDeleteSalesInvoice(e, item.HDB_ID)}>Xóa</button>
                                <button className="editbtn" onClick={this.handleEditSalesInvoice}>Sửa</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default SalesInvoices;