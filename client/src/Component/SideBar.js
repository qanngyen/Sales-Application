import React from "react"
import './SideBar.css'
import { Link } from "react-router-dom"

class SideBar extends React.Component {
    // truyền hàm dưới dang props xuống đây, dữ liệu trả về qua hàm trên site chính và render
    render() {
        return (
            <div className="sideBar">
                <h2 className="sideBarTitle">SALES APPLICATION</h2>
                {/* <ul className="nevigateBtn">
                    <li>Bán hàng</li>
                    <li>Nhập hàng</li>
                    <li>Hóa đơn bán</li>
                    <li>Hóa đơn nhập</li>
                    <li>Sản phẩm</li>
                    <li>Khách hàng</li>
                    <li>Nhà cung cấp</li>
                    <li className="logOutBtn">Đăng xuất</li>
                </ul> */}
                <ul className="nevigateBtn">
                    <Link to="/sales"><li>Bán hàng </li></Link>
                    <Link to="/import"><li>Nhập hàng </li></Link>
                    <Link to="/sales-invoice"><li>Hóa đơn bán </li></Link>
                    <Link to="/import-invoice"><li>Hóa đơn nhập </li></Link>
                    <Link to="/products"><li>Sản phẩm </li></Link>
                    <Link to="/customers"><li>Khách hàng </li></Link>
                    <Link to="/suppliers"><li>Nhà cung cấp </li></Link>
                    <li className="logOutBtn"><Link to="/logout">Đăng xuất</Link></li>
                </ul>
            </div>
        )
    }
}

export default SideBar;