import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const token = request.cookies.get('token');
        if (!token) {
            return NextResponse.json({ message: 'No token provided', success: false }, { status: 401 });
        }
        // Clear the cookie
        const response = NextResponse.json({ message: 'Logged out successfully', success: true });
        response.cookies.delete('token', { path: '/' });
        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ message: 'Server error', success: false }, { status: 500 });
    }
}