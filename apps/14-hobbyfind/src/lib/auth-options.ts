import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import bcrypt from "bcryptjs";
import { hasSupabaseEnv, supabaseAdmin } from "./supabase";

async function upsertSocialUser(email: string, provider: string) {
  const db = supabaseAdmin();
  const { data: existing, error: findErr } = await db
    .from("app_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (findErr) throw new Error(findErr.message);
  if (existing?.id) return existing.id as string;
  const { data: created, error } = await db
    .from("app_users")
    .insert({ email, password_hash: null, provider })
    .select("id")
    .single();
  if (error || !created) throw new Error(error?.message || "소셜 계정 생성 실패");
  return created.id as string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "email",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        if (!hasSupabaseEnv()) {
          throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
        }
        const db = supabaseAdmin();
        const { data, error } = await db
          .from("app_users")
          .select("id, email, password_hash")
          .eq("email", credentials.email)
          .maybeSingle();
        if (error) throw new Error(error.message);
        if (!data?.password_hash) return null;
        const ok = await bcrypt.compare(credentials.password, data.password_hash);
        if (!ok) return null;
        return { id: data.id, email: data.email };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_SECRET
      ? [
          Kakao({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider === "credentials") return true;
      if (!user.email) return false;
      if (!hasSupabaseEnv()) return false;
      try {
        const id = await upsertSocialUser(user.email, account.provider);
        user.id = id;
        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user?.email) token.email = user.email;
      if (account?.provider === "credentials" && user?.id) {
        token.uid = user.id;
        return token;
      }
      if (user?.email && hasSupabaseEnv()) {
        const { data } = await supabaseAdmin()
          .from("app_users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();
        if (data?.id) token.uid = data.id;
      } else if (user?.id) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.uid || token.sub || "");
        session.user.email = String(token.email || session.user.email || "");
      }
      return session;
    },
  },
};
