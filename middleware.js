import { NextResponse } from "next/server";

export default function middleware(req) {
    let verify = req.cookies.get("loggedin")
    let url = req.url

    if (!verify && url.includes("/halaqat")) {
        return NextResponse.redirect("http://localhost:3000/login")
    }

    if (verify && url === "http://localhost:3000/login") {
        return NextResponse.redirect("http://localhost:3000/halaqat")
    }
}