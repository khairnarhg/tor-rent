import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
//   // Example: Redirect all users to "/login" if they are not authenticated
//   const token = req.cookies.get('token'); // Adjust based on your auth logic

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next(); // Proceed with the request if authenticated
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
