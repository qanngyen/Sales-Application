import express, { Router } from 'express'
import route from './apis/index.js'

const port = 3000
// tạo 1 instance của express, instance này cung cấp các phương thức, 
// thuộc tính để điều khiển web app
const app = express()

// middleware để nhận được dữ liệu từ form
app.use(express.urlencoded())
app.use(express.json())

// web app sử dụng đường dẫn và với route bất kỳ
// route này chính là route của api 

// chia route nào chạy được mà không token
// chạy route login --> token --> lưu token vào localstorage --> khi call api khác thì gửi kèm token lên --> sử dụng next() để handle
// BE giải mã xác định role là admin là được không cần phải lưu token

// chạy handler check authentication
app.use('/apis', route)

   
// app sẽ "lắng nghe trên cổng port: 3000"
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})