// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
  // Get Kinde session
  const { getUser, isAuthenticated } = getKindeServerSession();

  // Check if user is authenticated
  const isAuth = await isAuthenticated();

  // If not authenticated, redirect to sign-in
  if (!isAuth) {
    // You can customize the sign-in URL based on your Kinde setup
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  try {
    // Get user from Kinde
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }

    // Fetch user details from your API
    // const userResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/users/${kindeUser.id}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
    //     },
    //   }
    // );

    const userResponse = await fetch(
      `https://yuktaha.com/api/getUser?email=${kindeUser.email}`,
      {
        method: "GET",
        cache: "no-store",
        // headers: {
        //   Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        // },
      }
    );

    if (!userResponse.ok) {
      // Handle API error - you might want to redirect to an error page
      return NextResponse.redirect(new URL("/error", request.url));
    }

    const userData = await userResponse.json();

    // Check if user role is staff
    if (userData.userRole !== "staff") {
      // Redirect non-staff users to yuktaha.com
      return NextResponse.redirect("https://yuktaha.com");
    }

    // Continue with the request for staff users
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    // Handle errors by redirecting to error page
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// Configure which paths require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes that might not need authentication
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
