import { NextResponse } from "next/server";
// M1: protect with JOBS_SECRET and acquire a Redis lock before running billing.
export async function GET() { return NextResponse.json({ queued: true }); }
