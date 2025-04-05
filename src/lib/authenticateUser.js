import jwt from 'jsonwebtoken';

export async function authenticateUser(request) {
    try {
        const authHeader = request.headers.get('Authorization');
        console.log("Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Token missing or incorrect format");
            return { success: false, message: "Token missing" };
        }

        const token = authHeader.split(' ')[1];
        console.log("Extracted Token:", token); 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        return { success: true, user: decoded };

    } catch (error) {
        console.log("Token Verification Error:", error.message);
        return { success: false, message: "Invalid token" };
    }
}
