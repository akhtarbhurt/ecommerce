// Import necessary modules
import { connect } from "@/database/mongo.config";
import { UploadImage } from "@/lib/upload-image";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();


export async function PUT(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    
    // Parse JSON data and FormData
    const formData = await request.formData();

    // Get the data from FormData
    const title = formData.get('title') as string;

    const price = parseFloat(formData.get('price') as string); 
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const image = formData.get('image') as unknown as File;

    // Find the existing product by ID
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return NextResponse.json(
        { status: 404, error: "Product not found" },
        { status: 404 }
      );
    }

    // Update the product fields
    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.description = description;
    existingProduct.category = category;

    // Upload the image and update the product's image field if an image is provided
    if (image) {
      const imageData: any = await UploadImage(image, "e-image");
    
      existingProduct.image = imageData.secure_url;
    }

    // Save the updated product to the database
    await existingProduct.save();

    // Return the updated product as the response
    return NextResponse.json(existingProduct);

  } catch (error) {
    console.error("Error in PUT method:", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id } = params
    const payload = await Product.findByIdAndDelete(id)
    return NextResponse.json(payload)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}