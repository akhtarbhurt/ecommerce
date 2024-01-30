// Add a webhook endpoint to your API route (api/webhooks/stripe.js)
import { connect } from '@/database/mongo.config';
import { Checkout } from '@/models/CheckOut';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
import Stripe from 'stripe';

connect()

const stripe = new Stripe(process.env.SECRET_KEY as string);


export async function POST(request: NextRequest) {
    try {
        const payload = await request.text();
        const sig = request.headers.get('stripe-signature');

        if(!sig){
            return NextResponse.json({error: "signature header is missing"})
        }
       
        const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string; // Replace with your actual endpoint secret

        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Extract necessary information from the session and store it in the Checkout database
            const userId = session?.metadata?.userId;
            const user = session?.metadata?.user;
            const address = session?.metadata?.address;
            const city = session?.metadata?.city;
            const phone = session?.metadata?.phone;
            const email = session?.metadata?.email;
            const final_price = session?.metadata?.final_price;
            const title = JSON.parse(session?.metadata?.title as string);
            const images = JSON.parse(session?.metadata?.images as string);
            const quantity = JSON.parse(session?.metadata?.qty as string);
            // ... Extract other relevant data

            const createCheckout = await Checkout.create({
                userId: userId,
                user: user,
                address: address,
                city: city,
                phone: phone,
                email: email,
                final_price: final_price,
                title: title,
                images: images,
                qty: quantity,
                paid: true

            });

            if (!createCheckout) {
                console.error('Failed to store checkout data.');
            }
        }
       


        return NextResponse.json({ received: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Webhook processing failed.' });
    }
}

export async function GET(request: NextRequest) {
    try {
        const authToken: any = request.cookies.get("token")?.value;
        const tokenVerify  = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload ;
        const payload = await Checkout.find({ userId: tokenVerify._id })
        return NextResponse.json(payload)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}