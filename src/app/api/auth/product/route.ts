// Import necessary modules
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { UploadImage } from "@/lib/upload-image";

// Connect to the database
connect();

// Handle POST requests
export async function POST(request: NextRequest) {
    try {

      

        // Parse JSON data and FormData
        
        const formData = await request.formData();

        // Get the data from FormData

        const title = formData.get('title') as string
        const price = formData.get('price') as string
        const description = formData.get('description') as string
        const category = formData.get('category') as string
        const image = formData.get('image') as unknown as File;

        // Upload the image and get its URL
        const imageData : any = await UploadImage(image, "e-image");
        
        // Create a new Product object
        const payload = await Product.create({
          title: title,
          price: price,
          description: description,
          category: category,
          image: imageData.secure_url
        });

        if(!payload){
          return NextResponse.json({message: "Production Validation Failed !", stattus: 400} )
        }

        // Save the product to the database
        await payload.save();

        // Return the response
        return NextResponse.json(payload);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}

export async function GET(request: NextRequest) {
    try {
      // Extract query parameters from the URL
      const { query  } : any = request.json;
      
      // Your existing code to query the database using the extracted parameters
      const result = await Product.find(query);
  
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