import { Checkout } from "@/models/CheckOut";
import { UserInfos } from "@/models/UserInfos";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import jwt from "jsonwebtoken";
import { title } from "process";

const stripe = new Stripe(process.env.SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const authToken: any = request.cookies.get("token")?.value;
    const tokenVerify = jwt.verify(authToken, process.env.JWT_KEY!) as jwt.JwtPayload;

    // Fetch user information from the database
    const userInfos: any = await UserInfos.findOne({ userId: tokenVerify._id });

    if (!userInfos) {
      return NextResponse.json({ error: "User information not found." });
    }

    // Create a customer with Stripe
    const customer = await stripe.customers.create({
      name: userInfos.name,
      email: userInfos.email,
      address: {
        line1: userInfos.address,
        city: userInfos.city,
        country: userInfos.country,
      },
    });

    // Extract line items from the request data
    const lineItems = data.lineItems;

    //variables

    const title = lineItems.map((item: any) => item?.price_data?.product_data?.name);
    const images = lineItems.map((item: any) => (item?.price_data?.product_data?.images ? item?.price_data?.product_data?.images[0] : ""));
    const qunatity = lineItems.map((item: any) => item.quantity)


    // Use the titles and images arrays directly in the product_detail object
    const createCheckout = await Checkout.create({
      userId: tokenVerify._id,
      user: userInfos.name,
      address: userInfos.address,
      city: userInfos.city,
      phone: userInfos.phone,
      email: userInfos.email,
      final_price: data.final_price,
      title: title,
      images: images,
      qty: qunatity,
      paid: false
    });
   
    if (!createCheckout) {
      return NextResponse.json({ error: "failed to checkout" })
    }

    // Create a checkout session with Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      mode: "payment",
      success_url: "https://etrade-alpha.vercel.app/payments/success?token=" + customer.id,
      cancel_url: "https://etrade-alpha.vercel.app/payments/cancel?token=" + customer.id,
      line_items: lineItems,
      metadata: {
        userId: tokenVerify._id,
        user: userInfos.name,
        address: userInfos.address,
        city: userInfos.city,
        phone: userInfos.phone,
        email: userInfos.email,
        final_price: data.final_price,
        title: JSON.stringify(title),
        images: JSON.stringify(images.slice(0, 5)),
        qty: JSON.stringify(qunatity.slice(0, 5)),

      }
    });





    // Return the checkout session URL to the client
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { query  } : any = request.json;
    
    // Your existing code to query the database using the extracted parameters
    const result = await Checkout.find(query);

    return NextResponse.json({ result  });
  } catch (error) {
    console.error("Error in GET method:", error);

    // Return a meaningful error response
    return NextResponse.json(
      { status: 400, error: "Invalid request data or empty query parameters" },
      { status: 400 }
    );
  }
}