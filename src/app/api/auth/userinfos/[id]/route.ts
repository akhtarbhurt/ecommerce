import { UserInfos } from "@/models/UserInfos";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    try {
        const { id } = params;
        // Assuming that request.json() contains the updated data
        const updatedData = await request.json();

        // Find the document by ID and update it
        const updatedDocument = await UserInfos.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true } // Return the modified document (default is the original document)
        );

        if (!updatedDocument) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDocument);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}
