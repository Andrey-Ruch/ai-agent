// app/api/account/route.ts
import { NextResponse } from "next/server";
import { updateUser } from "@/lib/database/mongodb";
// import logToFile, { logType } from "@/utills/logToFile";

export async function POST(request: Request) {
  try {
    const { user } = await request.json();
    // logToFile("Updating user: " + JSON.stringify(user), logType.info);

    await updateUser(user);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    // logToFile("Error updating user: " + error, logType.error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
