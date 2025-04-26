import UserModel from "@/models/userModel";
import { authenticateUser } from "@/lib/authenticateUser"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request) {
    await dbConnect()

    try {
        const auth = await authenticateUser(request)
        console.log("Auth Middleware Response:", auth);


        if(!auth.success) {
            return NextResponse.json({
                success: false,
                message:"Authentication failed",
                status: 401
            })
        }

        const userId = auth.user.id
        console.log("user id: " + userId);
        
        const user = await UserModel.findById(userId).select("-password")
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
                status: 404
            })
        }
        return NextResponse.json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error fetching user: ", error.message);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500
        })
        
    }   
}