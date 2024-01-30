import { Cart } from "@/models/Cart"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: any) {
    try {
      const { id } = params
      const payload = await Cart.findByIdAndDelete(id)
      return NextResponse.json(payload)
    } catch (error) {
      console.log(error)
      return NextResponse.json(error)
    }
  }