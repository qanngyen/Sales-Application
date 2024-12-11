import React from "react"
import '../Styles/LoginPage.css'
import logo from '../img/hehe.jpg'
import axios from '../axiosConfig.js'
// import { history } from '../history.js'; // Import history


class LoginPage extends React.Component {    
    state = {
        username: '',
        password: '',
        message: ''
    };
    loginHandler = async (e) => {
        e.preventDefault(); // chặn sự kiện tải lại của thẻ form
        const {username, password} = this.state
        try {
            const res = await axios.post('/login', {username, password})
            console.log(res)
            if (res.status === 200)
                localStorage.setItem('token', res.data.token)
                this.setState({
                    username: '',
                    password: '',
                    message: 'Đăng nhập thành công!' 
                })
                window.location.href = '/dashboard' // đưa người dùng đến dashboard khi đăng nhập thành công
        } catch (err) {
            console.log(err)
        } finally {
            this.setState({
                username: '',
                password: '',
                message: 'Đăng nhập thất bại!'
            })
        }
    }
    render() {
        return (
            <div className="loginSite">
                <div className="loginContainer">
                    <h1 className="applicationTilte">SALES APPLICATION</h1>
                    <div className="loginArea">
                        <div className="imgArea">
                            <img src={logo} alt="Sales Application" />
                        </div>
                        <div className="formArea">
                            <form className='formLogin' method="post" onSubmit={this.loginHandler}>
                                <label className='labelOfLoginForm' htmlFor="username">Username</label> {/**truyền id ở đây**/}
                                <input className='inputOfLoginForm' id="username" name="username" type="text" placeholder='Nhập tên đăng nhập' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} required/>
                                <label className='labelOfLoginForm' htmlFor="password">Password</label>
                                <input className='inputOfLoginForm' id="password" name="password" type="password" placeholder='Nhập mật khẩu' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} required/>
                                <input className='buttonOfLoginForm' id="loginBtn" type="submit" value="ĐĂNG NHẬP"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;