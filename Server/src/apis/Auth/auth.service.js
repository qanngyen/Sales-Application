import pool from '../data/connection.js'
class authentication {
    login(username, password) {
        try {
            // Check if the username and password are valid
            if (username === 'admin' && password === 'password') {
                // tạo token
                return {
                    success: true,
                    message: 'Login successful',
                    token: 'your-unique-token' // replace with actual token generation logic
                }
            } else {
                return {
                    success: false,
                    message: 'Invalid username or password'
                };
            }
        } catch (e) {
            console.error('Error in authentication:', e);
            return {
                success: false,
                message: 'An error occurred while trying to authenticate'
            }
        }
    }
}

export default new authentication()