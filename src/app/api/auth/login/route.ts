import { connect } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { loginSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validator = vine.compile(loginSchema);
        validator.errorReporter = () => new ErrorReporter();
        const output = await validator.validate(body);
        
        const user = await User.findOne({ email: output.email });

        if (user) {
            const checkPassword = bcrypt.compareSync(output.password, user.password);

            if (checkPassword) {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    },
                    process.env.JWT_KEY!,
                    {
                       expiresIn: "1d"
                       
                    }
                );
                
                const response = NextResponse.json(
                    {
                        status: 200,
                        message: "User logged in",
                    },
                    { status: 200 }
                );
                    
                response.cookies.set("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                });

                return response;
            } else {
                return NextResponse.json(
                    {
                        status: 400,
                        errors: {
                            email: "Invalid credentials",
                        },
                    },
                    { status: 200 }
                );
            }
        } else {
            return NextResponse.json(
                {
                    status: 400,
                    errors: {
                        email: "No account found with this email",
                    },
                },
                { status: 200 }
            );
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { status: 400, errors: error.messages },
                { status: 200 }
            );
        } else {
            // Handle other errors if needed
            console.error(error);
            return NextResponse.json(
                { status: 500, message: "Internal Server Error" },
                { status: 200 }
            );
        }
    }
}

export async function GET(request: NextRequest) {
    try {
        const authToken: any = request.cookies.get("token")?.value;
        const data = jwt.verify(authToken, process.env.JWT_KEY!);
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}