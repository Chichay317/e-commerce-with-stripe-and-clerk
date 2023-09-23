import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    return NextResponse.json({
      message: "Connection is Active!",
      success: true,
      reqBody,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
