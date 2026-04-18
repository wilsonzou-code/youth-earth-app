import { prisma } from "@/lib/prisma";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import a from "@/styles/admin.module.css";

export default async function Submissions() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  return (
    <>
      <div className={a.pageHead}>
        <div>
          <h1 className={a.pageTitle}>Submissions</h1>
          <div className={a.pageSub}>{pending.length} pending review</div>
        </div>
      </div>
      <div className={a.body}>
        {pending.length === 0 && reviewed.length === 0 && (
          <p className={a.empty}>No submissions yet.</p>
        )}

        {pending.length > 0 && (
          <>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 12 }}>
              Pending ({pending.length})
            </h2>
            <table className={a.table} style={{ marginBottom: 40 }}>
              <thead>
                <tr><th>Submission</th><th>Author</th><th>Kind</th><th>Received</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pending.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className={a.tdTitle}>{s.title}</div>
                      <div className={a.tdBody} style={{ marginTop: 6 }}>{s.body.slice(0, 140)}{s.body.length > 140 ? "…" : ""}</div>
                    </td>
                    <td><div>{s.name}</div><div className={a.tdMeta}>{s.country}</div></td>
                    <td><span className={a.badge} style={{ background: "var(--yxe-sand-200)", color: "var(--fg-2)" }}>{s.kind}</span></td>
                    <td className={a.tdMeta}>{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td><SubmissionActions id={s.id} title={s.title} name={s.name} country={s.country} body={s.body} kind={s.kind} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {reviewed.length > 0 && (
          <>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 12 }}>
              Reviewed ({reviewed.length})
            </h2>
            <table className={a.table}>
              <thead>
                <tr><th>Submission</th><th>Author</th><th>Kind</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {reviewed.map((s) => (
                  <tr key={s.id}>
                    <td><div className={a.tdTitle}>{s.title}</div></td>
                    <td><div>{s.name}</div><div className={a.tdMeta}>{s.country}</div></td>
                    <td>{s.kind}</td>
                    <td>
                      <span className={`${a.badge} ${s.status === "approved" ? a.badgeApproved : a.badgeRejected}`}>{s.status}</span>
                    </td>
                    <td className={a.tdMeta}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
