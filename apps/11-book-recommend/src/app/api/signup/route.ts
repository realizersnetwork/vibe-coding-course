import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { hasSupabaseEnv, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    if (!hasSupabaseEnv()) {
      return NextResponse.json({ error: "Supabase 환경변수가 없습니다." }, { status: 500 });
    }
    const { email, password } = (await req.json()) as { email?: string; password?: string };
    if (!email || !password || password.length < 4) {
      return NextResponse.json({ error: "이메일과 4자 이상 비밀번호를 입력하세요." }, { status: 400 });
    }
    const hash = await bcrypt.hash(password, 10);
    const { data, error } = await supabaseAdmin()
      .from("shelf_users")
      .insert({ email, password_hash: hash })
      .select("id, email")
      .single();
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, user: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "가입 실패" }, { status: 500 });
  }
}
