"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import a from "@/styles/admin.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError("Invalid email or password.");
    else router.push("/admin");
  }

  return (
    <div className={a.loginWrap}>
      <div className={a.loginBox}>
        <div className={a.loginLogo}>Youth<em>×</em>Earth</div>
        <p className={a.loginSub}>Editorial dashboard</p>
        <form onSubmit={submit} className={a.loginForm}>
          <label className={a.label}>Email</label>
          <input name="email" type="email" required autoFocus className={a.input} placeholder="editor@youth-x-earth.org" />
          <label className={a.label}>Password</label>
          <input name="password" type="password" required className={a.input} placeholder="••••••••" />
          {error && <p className={a.error}>{error}</p>}
          <button type="submit" disabled={loading} className={a.loginBtn}>
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}
