"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import a from "@/styles/admin.module.css";

type Props = { id: string; published: boolean; type: "articles" | "letters" | "discussions" };

export function PublishToggle({ id, published, type }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(published);

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/admin/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !live }),
    });
    if (res.ok) {
      setLive((v) => !v);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      className={`${a.btn} ${live ? a.btnUnpublish : a.btnPublish}`}
      onClick={toggle}
      disabled={loading}
    >
      {loading ? "…" : live ? "Unpublish" : "Publish"}
    </button>
  );
}
