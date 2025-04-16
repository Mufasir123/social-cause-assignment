import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const response = NextResponse.json({
            message: 'Logged out successfully',
            success: true,
          });
      
          response.cookies.set('token', '', { path: '/', expires: new Date(0) }); // set expired cookie
          return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ message: 'Server error', success: false }, { status: 500 });
    }
}