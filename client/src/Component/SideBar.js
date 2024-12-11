import React from "react"
import './SideBar.css'

class SideBar extends React.Component {
    // truyền hàm dưới dang props xuống đây, dữ liệu trả về qua hàm trên site chính và render
    render() {
        return (
            <div className="sideBar">
                <h2 className="sideBarTitle">SALES APPLICATION</h2>
                <ul className="nevigateBtn">
                    <li>Bán hàng</li>
                    <li>Nhập hàng</li>
                    <li>Hóa đơn bán</li>
                    <li>Hóa đơn nhập</li>
                    <li>Sản phẩm</li>
                    <li>Khách hàng</li>
                    <li>Nhà cung cấp</li>
                    <li className="logOutBtn">Đăng xuất</li>
                </ul>
            </div>
        )
    }
}

export default SideBar;