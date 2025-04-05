import UserModel from "@/models/userModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {email, password} =await request.json();
    try {
        const user = await UserModel.findOne({ email})
        if(!user){
            return NextResponse.json({message: "User not found/ Register please"},{status:401})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return NextResponse.json({message: "Invalid credentials"},{status:401})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await cookies().set('token', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            path: '/',
        });

        return NextResponse.json({message: "Logged in successfully",token, user},{status:200});
    } catch (error) {
        console.log("Error is coming from server: " + error.message);
        return NextResponse.json({message: "Server Error"},{status:500})
        
    }
}
