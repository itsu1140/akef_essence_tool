import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const rootPath = process.env.ROOT_PATH;
    if (!rootPath) return NextResponse.next();

    const { pathname } = request.nextUrl;
    if (pathname.startsWith(`${rootPath}/_next/`)) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.slice(rootPath.length);
        return NextResponse.rewrite(url);
    }
}
