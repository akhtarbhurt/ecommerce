import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserInfos } from "@/models/UserInfos";

export async function POST(request: NextRequest) {
    try {
        const { userId, name, email, country, city, phone, address } = await request.json();
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload;

        const existingInfo = await UserInfos.findOne({ userId: tokenVerify._id });

        if (existingInfo) {
            return NextResponse.json({ error: "Personal info already submitted" }, { status: 400 });
        }

        const userinfo = await UserInfos.create({
            userId: tokenVerify._id,
            email : tokenVerify.email,
            name, country, city, phone, address
        });

        return NextResponse.json(userinfo);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload;

        const payload = await UserInfos.find({ userId: tokenVerify._id });

        return NextResponse.json(payload);

    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}
