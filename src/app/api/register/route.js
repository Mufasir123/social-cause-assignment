import UserModel from "@/models/userModel";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { NextResponse } from "next/server";



export async function POST(request) {
    const { name, email, password, yourPassion } = await request.json();
    
    try {
        // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) return NextResponse.json({ message: 'User already exists' , success:false},{status:400});

    if(!validator.isEmail(email)){
        return NextResponse.json({ message: 'Invalid email format', success:false },{status:400});
    }

    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    
    // Create new user
    const newUser = new UserModel({ name, email, password: hashedPassword,yourPassion });
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({
        success: true,
        message: `Welcome ${newUser.name || newUser.email}`,
        user: newUser,
        token: token,
        expiresIn: 86400000 // 24 hours in milliseconds
    })
    response.cookies.set("token",token,{
        expires: new Date(Date.now() + 86400000), // 24 hours from now
        path: '/',
        httpOnly: true,
    })

    return response;
    } catch (error) {
        console.log("Error is coming", error);
        return NextResponse.json({ message: 'Server error', success: false, status:500 });
        
    }
    
}