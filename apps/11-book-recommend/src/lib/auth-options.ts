import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { hasSupabaseEnv, supabaseAdmin } from "./supabase";

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
        if (!hasSupabaseEnv()) throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
        const { data, error } = await supabaseAdmin()
          .from("shelf_users")
          .select("id, email, password_hash")
          .eq("email", credentials.email)
          .maybeSingle();
        if (error) throw new Error(error.message);
        if (!data) return null;
        const ok = await bcrypt.compare(credentials.password, data.password_hash);
        if (!ok) return null;
        return { id: data.id, email: data.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id;
      if (user?.email) token.email = user.email;
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
