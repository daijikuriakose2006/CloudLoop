import { NextResponse } from "next/server";
// M4: verify x-razorpay-signature against raw request body before processing.
export async function POST() { return NextResponse.json({ received: true }); }
