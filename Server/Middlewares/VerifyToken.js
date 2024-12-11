// verifyTokenHandler.js
const verifyTokenHandler = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Token is missing or invalid format. Expected: Bearer <token>',
        });
    }

    const token = authHeader.split(' ')[1];

    // Kiểm tra token (đơn giản, không mã hóa)
    const VALID_TOKEN = 'your-unique-token';
    if (token === VALID_TOKEN) {
        // Token hợp lệ
        next(); // Chuyển tiếp đến handler tiếp theo
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};

export default verifyTokenHandler;
