import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username and password are valid
        if (username === 'admin' && password === 'password') {
            // Tạo token (ví dụ sử dụng JWT)
            const token = 'your-unique-token'; // Thay bằng logic thực tế để tạo token

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token: token,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }
    } catch (e) {
        console.error('Error in authentication:', e);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while trying to authenticate',
        });
    }
});

export default router;
