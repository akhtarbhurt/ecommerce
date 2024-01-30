import { connect } from "@/database/mongo.config";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest){
    try {
        const { userId, title, price, description, category, image} = await request.json()
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify  = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload ;

         // Check if the product already exists in the user's cart
         const existingCartItem = await Cart.findOne({
            userId: tokenVerify._id,
            title,
            price,
            description,
            category,
            image,
        });

        if (!existingCartItem) {
            

            const cart = await Cart.create({
                userId: tokenVerify._id,
                title,
                price,
                description,
                category,
                image
            })
            return NextResponse.json(cart)

        }

        return NextResponse.json({error : "Product already exists in the cart", status: 400 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}

export async function GET(request: NextRequest){
    try {
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify  = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload ;
        
        const payload = await Cart.find({ userId: tokenVerify._id })

        return NextResponse.json(payload)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}