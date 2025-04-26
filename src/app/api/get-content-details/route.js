import dbConnect from "@/lib/db";
import ContentModel from "@/models/contenModel";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    try {
        const data = await ContentModel.find({}).sort({ date: -1 }).limit(10).exec();
        console.log("Fetched data:", data);
        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.log("Error is coming", error);
        return NextResponse.json({ message: 'Server error', success: false, status: 500 });
        
    }
}