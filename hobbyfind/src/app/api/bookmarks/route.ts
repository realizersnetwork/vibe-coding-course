import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { hasSupabaseEnv, supabaseAdmin } from "@/lib/supabase";
import { HOBBIES } from "@/data/hobbies";

async function userId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

export async function GET() {
  try {
    const uid = await userId();
    if (!uid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    if (!hasSupabaseEnv()) {
      return NextResponse.json({ error: "Supabase 환경변수가 없습니다." }, { status: 500 });
    }
    const { data, error } = await supabaseAdmin().from("bookmarks").select("hobby_id").eq("user_id", uid);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ids: (data || []).map((r) => r.hobby_id) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "조회 실패" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const uid = await userId();
    if (!uid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    if (!hasSupabaseEnv()) {
      return NextResponse.json({ error: "Supabase 환경변수가 없습니다." }, { status: 500 });
    }
    const { hobbyId } = (await req.json()) as { hobbyId?: string };
    const hobby = HOBBIES.find((h) => h.id === hobbyId);
    if (!hobby) return NextResponse.json({ error: "없는 취미입니다." }, { status: 400 });
    const db = supabaseAdmin();
    const { data: existing } = await db
      .from("bookmarks")
      .select("id")
      .eq("user_id", uid)
      .eq("hobby_id", hobby.id)
      .maybeSingle();
    if (existing) {
      const { error } = await db.from("bookmarks").delete().eq("id", existing.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ saved: false });
    }
    const { error } = await db.from("bookmarks").insert({
      user_id: uid,
      hobby_id: hobby.id,
      category: hobby.category,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ saved: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "저장 실패" }, { status: 500 });
  }
}
