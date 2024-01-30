import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Promisify the verify function of the jsonwebtoken library
const verifyAsync = (token : any , key : any, options : any ) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, options, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

export async function middleware(request: NextRequest) {
    
    // try {
    //     // Retrieve the token from the request cookies
    //     const token = request.cookies.get('token')?.value;

    //     // Check if the token is present
    //     if (!token) {
    //         // Redirect to login if the token is not present
    //         return NextResponse.redirect(new URL("/login", request.url));
    //     }

    //     // Verify the token using the promisified verify function
    //     const decodedToken = await jwt.verifyAsync(token, process.env.JWT_KEY!, { algorithms: ['HS256'] });

    //     // Check if the user has admin permissions
    //     const isAdmin = decodedToken.isAdmin;

    //     // Define admin-protected routes
    //     const adminProtectedRoutes = ["/admin/dashboard"];

    //     // Check if the user is trying to access an admin-protected route without admin permissions
    //     if (adminProtectedRoutes.includes(pathname) && !isAdmin) {
    //         return NextResponse.redirect(new URL("/login", request.url));
    //     }

    //     // Continue to the next middleware or route handler
    //     return;
    // } catch (error) {
    //     // Handle token verification errors or other issues
    //     console.error("Middleware error:", error);

    //     // Redirect to login in case of an error
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }
}
export const config = {
    matcher: '/:path*',
  }