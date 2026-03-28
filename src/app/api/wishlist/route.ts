import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getUserId(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  const deviceId = request.headers.get("x-device-id");
  if (deviceId && isValidUUID(deviceId)) {
    return deviceId;
  }
  return null;
}

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return NextResponse.json({ items: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("wishlist_items")
      .select(`
        *,
        products (*)
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Wishlist fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data || [] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { product_id } = await request.json();
    const userId = getUserId(request);

    if (!userId) {
      return NextResponse.json({ error: "User not identified" }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: existing } = await supabase
      .from("wishlist_items")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", product_id)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already in wishlist", item: existing });
    }

    const { data, error } = await supabase
      .from("wishlist_items")
      .insert({
        user_id: userId,
        product_id,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "Already in wishlist" });
      }
      console.error("Wishlist insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const productId = searchParams.get("product_id");
    const userId = getUserId(request);

    if (!userId) {
      return NextResponse.json({ error: "User not identified" }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (id) {
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        console.error("Wishlist delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else if (productId) {
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", parseInt(productId));

      if (error) {
        console.error("Wishlist delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
