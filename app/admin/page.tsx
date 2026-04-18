import { prisma } from "@/lib/prisma";
import Link from "next/link";
import a from "@/styles/admin.module.css";

export default async function AdminDashboard() {
  const [
    articlesTotal, articlesLive,
    lettersTotal, lettersLive,
    discussionsTotal,
    submissionsPending, submissionsTotal,
    recentSubmissions,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.letter.count(),
    prisma.letter.count({ where: { published: true } }),
    prisma.discussion.count(),
    prisma.submission.count({ where: { status: "pending" } }),
    prisma.submission.count(),
    prisma.submission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <>
      <div className={a.pageHead}>
        <div>
          <h1 className={a.pageTitle}>Dashboard</h1>
          <div className={a.pageSub}>Youth × Earth editorial</div>
        </div>
        <Link href="/" target="_blank" className={a.btn} style={{ background: "transparent", border: "1px solid var(--border-default)", color: "var(--fg-2)", textDecoration: "none", fontSize: 13, padding: "8px 14px", borderRadius: 6, fontWeight: 600 }}>
          View site ↗
        </Link>
      </div>

      <div className={a.body}>
        <div className={a.statsGrid}>
          <div className={a.statCard}>
            <div className={a.statLabel}>Submissions</div>
            <div className={`${a.statNum} ${submissionsPending > 0 ? a.statPending : ""}`}>{submissionsPending}</div>
            <div className={a.statSub}>{submissionsPending} pending · {submissionsTotal} total</div>
          </div>
          <div className={a.statCard}>
            <div className={a.statLabel}>Articles</div>
            <div className={a.statNum}>{articlesLive}</div>
            <div className={a.statSub}>{articlesLive} live · {articlesTotal} total</div>
          </div>
          <div className={a.statCard}>
            <div className={a.statLabel}>Letters</div>
            <div className={a.statNum}>{lettersLive}</div>
            <div className={a.statSub}>{lettersLive} live · {lettersTotal} total</div>
          </div>
          <div className={a.statCard}>
            <div className={a.statLabel}>Discussions</div>
            <div className={a.statNum}>{discussionsTotal}</div>
            <div className={a.statSub}>{discussionsTotal} active</div>
          </div>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>Recent submissions</h2>
        {recentSubmissions.length === 0 ? (
          <p className={a.empty}>No submissions yet.</p>
        ) : (
          <table className={a.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Kind</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((s) => (
                <tr key={s.id}>
                  <td><div className={a.tdTitle}>{s.title}</div></td>
                  <td><div>{s.name}</div><div className={a.tdMeta}>{s.country}</div></td>
                  <td>{s.kind}</td>
                  <td>
                    <span className={`${a.badge} ${s.status === "pending" ? a.badgePending : s.status === "approved" ? a.badgeApproved : a.badgeRejected}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className={a.tdMeta}>{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {submissionsPending > 0 && (
          <div style={{ marginTop: 16 }}>
            <Link href="/admin/submissions" style={{ fontSize: 13, fontWeight: 600, color: "var(--yxe-forest-700)", textDecoration: "none" }}>
              Review all pending submissions →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
