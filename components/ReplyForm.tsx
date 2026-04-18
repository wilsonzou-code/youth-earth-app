"use client";
import { useState } from "react";
import s from "@/styles/pages.module.css";

export function ReplyForm({ discussionId }: { discussionId: string }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/discussions/${discussionId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country, body }),
    });
    setSent(true);
    setLoading(false);
  }

  if (sent) return <p className={s.thankNote}>Reply posted. Thank you.</p>;

  return (
    <form onSubmit={submit} className={s.replyForm}>
      <label className={s.formLabel}>Add a reply</label>
      <div className={s.formRow}>
        <input required placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={s.formInput} />
        <input required placeholder="Country code (e.g. NGA)" value={country} onChange={e => setCountry(e.target.value)} className={s.formInput} />
      </div>
      <textarea required rows={3} placeholder="Signed replies only. Your name and country will appear publicly." value={body} onChange={e => setBody(e.target.value)} className={s.formTextarea} />
      <button type="submit" disabled={loading} className={s.btnPrimary}>{loading ? "Posting…" : "Post reply →"}</button>
    </form>
  );
}
