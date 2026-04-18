import { prisma } from "@/lib/prisma";
import { PublishToggle } from "@/components/admin/PublishToggle";
import Link from "next/link";
import a from "@/styles/admin.module.css";

export default async function AdminLetters() {
  const letters = await prisma.letter.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className={a.pageHead}>
        <div>
          <h1 className={a.pageTitle}>Letters</h1>
          <div className={a.pageSub}>{letters.filter((x) => x.published).length} live · {letters.length} total</div>
        </div>
      </div>
      <div className={a.body}>
        {letters.length === 0 ? (
          <p className={a.empty}>No letters yet. Approve a submission to publish one.</p>
        ) : (
          <table className={a.table}>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Category</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <tr key={letter.id}>
                  <td>
                    <div className={a.tdTitle}>{letter.title}</div>
                    <div className={a.tdMeta}>{new Date(letter.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div>{letter.author.name}</div>
                    <div className={a.tdMeta}>{letter.author.countryCode}</div>
                  </td>
                  <td><span className={a.badge} style={{ background: "var(--yxe-sand-200)", color: "var(--fg-2)" }}>{letter.category}</span></td>
                  <td>
                    <span className={`${a.badge} ${letter.published ? a.badgeLive : a.badgeDraft}`}>
                      {letter.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className={a.actions}>
                      <PublishToggle id={letter.id} published={letter.published} type="letters" />
                      <Link href={`/letters/${letter.slug}`} target="_blank"
                        style={{ fontSize: 12, color: "var(--yxe-forest-700)", textDecoration: "none", fontWeight: 600 }}>
                        View ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
