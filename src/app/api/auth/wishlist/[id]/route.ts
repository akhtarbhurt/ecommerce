import { WhishList } from "@/models/WhishList"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: any) {
    try {
      const { id } = params
      const payload = await WhishList.findByIdAndDelete(id)
      return NextResponse.json(payload)
    } catch (error) {
      console.log(error)
      return NextResponse.json(error)
    }
  }