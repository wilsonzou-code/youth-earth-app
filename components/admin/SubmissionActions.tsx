"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import a from "@/styles/admin.module.css";

type Props = { id: string; title: string; name: string; country: string; body: string; kind: string };

export function SubmissionActions({ id, title, name, country, body, kind }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [expanded, setExpanded] = useState(false);

  async function act(action: "approve" | "reject") {
    setLoading(action);
    await fetch(`/api/admin/submissions/${id}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, name, country, body, kind }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div>
      <div className={a.actions}>
        <button className={a.btn} onClick={() => setExpanded((v) => !v)}
          style={{ background: "transparent", border: "1px solid var(--border-default)", color: "var(--fg-2)", fontSize: 12, padding: "6px 10px", borderRadius: 4, cursor: "pointer" }}>
          {expanded ? "Hide" : "Read"}
        </button>
        <button className={`${a.btn} ${a.btnApprove}`} disabled={loading !== null}
          onClick={() => act("approve")}>
          {loading === "approve" ? "…" : "Approve + publish"}
        </button>
        <button className={`${a.btn} ${a.btnReject}`} disabled={loading !== null}
          onClick={() => act("reject")}>
          {loading === "reject" ? "…" : "Reject"}
        </button>
      </div>
      {expanded && (
        <div className={a.submissionDetail}>
          <div className={a.detailTitle}>{title}</div>
          <div className={a.detailMeta}>{name} · {country} · {kind}</div>
          <div className={a.detailBody}>{body}</div>
        </div>
      )}
    </div>
  );
}
