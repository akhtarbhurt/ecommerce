import { connect } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { WhishList } from "@/models/WhishList";


connect();

export async function POST(request: NextRequest){
    try {
        const { userId, title, price, description, category, image} = await request.json()
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify  = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload ;

         // Check if the wish list already exists in the user's cart
         const existingCartItem = await WhishList.findOne({
            userId: tokenVerify._id,
            title,
            price,
            description,
            category,
            image,
        });

        if (!existingCartItem) {
            

            const cart = await WhishList.create({
                userId: tokenVerify._id,
                title,
                price,
                description,
                category,
                image
            })
            return NextResponse.json(cart)

        }

        return NextResponse.json({error : "Product already exists in the wish list", status: 400 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}

export async function GET(request: NextRequest){
    try {
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify  = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload ;
        
        const payload = await WhishList.find({ userId: tokenVerify._id })

        return NextResponse.json(payload)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}