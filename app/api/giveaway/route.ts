import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { giveawaySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = giveawaySchema.parse(body);

    // Insert into database
    const { data, error } = await supabase
      .from("giveaway_entries")
      .insert([
        {
          email: validatedData.email,
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          instagram_handle: validatedData.instagramHandle || null,
          phone: validatedData.phone,
          pain_area: validatedData.painArea,
          pain_area_other: validatedData.painAreaOther || null,
          why_not_yet: validatedData.whyNotYet,
          interest_level: validatedData.interestLevel,
        },
      ])
      .select();

    if (error) {
      // Check for unique constraint violation (duplicate email)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You have already entered this giveaway" },
          { status: 409 },
        );
      }

      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to submit entry" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    // Zod validation error
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
