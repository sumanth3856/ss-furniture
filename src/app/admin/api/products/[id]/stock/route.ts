import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const headers = { "Content-Type": "application/json" };
  
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400, headers });
    }

    let body: { in_stock?: boolean } = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400, headers });
    }

    if (body.in_stock === undefined) {
      return NextResponse.json({ error: "in_stock field is required" }, { status: 400, headers });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("products")
      .update({ 
        in_stock: body.in_stock,
        updated_at: new Date().toISOString()
      })
      .eq("id", productId)
      .select("id, in_stock")
      .single();

    if (error) {
      console.error("Stock update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500, headers });
    }

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}
