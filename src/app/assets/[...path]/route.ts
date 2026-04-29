import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const MIME: Record<string, string> = {
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    map: "application/json",
    woff: "font/woff",
    woff2: "font/woff2",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    ico: "image/x-icon",
};

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;

    // expect: _next/static/...
    if (path[0] !== "_next" || path[1] !== "static") {
        return new NextResponse("Not Found", { status: 404 });
    }

    const relativePath = path.slice(2).join("/");
    const filePath = join(process.cwd(), ".next", "static", relativePath);

    try {
        const content = await readFile(filePath);
        const ext = filePath.split(".").pop() ?? "";
        return new NextResponse(content, {
            headers: {
                "Content-Type": MIME[ext] ?? "application/octet-stream",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new NextResponse("Not Found", { status: 404 });
    }
}
