"use client";
import { useState } from "react";
import s from "@/styles/pages.module.css";

export function SubmitForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setSent(true);
    setLoading(false);
  }

  if (sent) return (
    <div className={s.thankyou}>
      <span className={s.eyebrow}>Received</span>
      <h2 className={s.pageTitle}>Thank you. We read every submission.</h2>
      <p>You&rsquo;ll hear from an editor within two weeks.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className={s.form}>
      <div className={s.formRow}>
        <div><label className={s.formLabel}>Your name</label><input name="name" required placeholder="Amara Okonkwo" className={s.formInput} /></div>
        <div><label className={s.formLabel}>Country</label><input name="country" required placeholder="Nigeria" className={s.formInput} /></div>
      </div>
      <div>
        <label className={s.formLabel}>Kind</label>
        <select name="kind" className={s.formInput}>
          <option>Essay</option><option>Letter</option><option>Discussion prompt</option>
        </select>
      </div>
      <div><label className={s.formLabel}>Title</label><input name="title" required placeholder="Working title" className={s.formInput} /></div>
      <div><label className={s.formLabel}>Your writing</label><textarea name="body" required rows={10} placeholder="Paste your draft here." className={s.formTextarea} /></div>
      <button type="submit" disabled={loading} className={s.btnPrimary}>{loading ? "Submitting…" : "Submit for review →"}</button>
    </form>
  );
}
