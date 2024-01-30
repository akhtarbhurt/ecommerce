import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registrationSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { query  } : any = request.json;
    
    // Your existing code to query the database using the extracted parameters
    const find = await User.find(query);

    return NextResponse.json({ find });
  } catch (error) {
    console.error("Error in GET method:", error);

    // Return a meaningful error response
    return NextResponse.json(
      { status: 400, error: "Invalid request data or empty query parameters" },
      { status: 400 }
    );
  }
}



export async function POST(request: NextRequest) {
  try {
    const body: UserPayload = await request.json();
    vine.errorReporter = () => new ErrorReporter();
    const validator = vine.compile(registrationSchema);
    const output = await validator.validate(body);
    const isAdmin = body.isAdmin || false
    try {
      const user = await User.findOne({ email: output.email });
      if (user) {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              email: "Email is already used.",
            },
          },
          { status: 200 }
        );
      } else {
        // * To Hash the password
        const salt = bcrypt.genSaltSync(10);
        output.password = bcrypt.hashSync(output.password, salt);
        await User.create({ ...output, isAdmin });

        return NextResponse.json(
          { status: 200, message: "Account Created successfully! please login to your account " },
          { status: 200 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}