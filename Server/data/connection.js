import sql from 'mssql/msnodesqlv8';
const config = {
    server: 'DESKTOP-70I8H6G\\SQLEXPRESS',
    database: 'STORE',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};
const pool = new sql.ConnectionPool(config);
pool.connect()
    .then(() => console.log("Connected to SQL Server successfully using Windows Authentication!"))
    .catch(error => console.error("Error connecting to SQL Server:", error));

    const runQuery = async () => {
        try {
            await pool.connect(); // Kết nối đến SQL Server
            const result = await pool.request().query("SELECT top 1 * FROM HANGHOA"); // Thực hiện truy vấn
            console.log(result.recordset); // In ra các hàng dữ liệu từ truy vấn
        } catch (error) {
            console.error("Error:", error); // Xử lý lỗi nếu xảy ra
        } finally {
            await pool.close(); // Đóng kết nối sau khi hoàn tất
        }
    };
    
runQuery();

export default pool;
