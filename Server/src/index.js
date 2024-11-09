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
app.use('/apis', route)



// app.get('/', (req, res) => {
//     res.send("Hello from server!");  // Gửi thông điệp ra trình duyệt
//     // Kết nối và thực hiện truy vấn
// })


// app sẽ "lắng nghe trên cổng port: 3000"
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})