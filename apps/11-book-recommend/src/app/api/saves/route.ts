import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { hasSupabaseEnv, supabaseAdmin } from "@/lib/supabase";
import { BOOKS } from "@/data/books";

async function userId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

export async function GET() {
  const uid = await userId();
  if (!uid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  if (!hasSupabaseEnv()) return NextResponse.json({ error: "Supabase 환경변수가 없습니다." }, { status: 500 });
  const { data, error } = await supabaseAdmin().from("shelf_saves").select("book_id").eq("user_id", uid);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ids: (data || []).map((r) => r.book_id) });
}

export async function POST(req: Request) {
  const uid = await userId();
  if (!uid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  if (!hasSupabaseEnv()) return NextResponse.json({ error: "Supabase 환경변수가 없습니다." }, { status: 500 });
  const { bookId } = (await req.json()) as { bookId?: string };
  const book = BOOKS.find((b) => b.id === bookId);
  if (!book) return NextResponse.json({ error: "없는 책입니다." }, { status: 400 });
  const db = supabaseAdmin();
  const { data: existing } = await db
    .from("shelf_saves")
    .select("id")
    .eq("user_id", uid)
    .eq("book_id", book.id)
    .maybeSingle();
  if (existing) {
    const { error } = await db.from("shelf_saves").delete().eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ saved: false });
  }
  const { error } = await db.from("shelf_saves").insert({ user_id: uid, book_id: book.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ saved: true });
}
