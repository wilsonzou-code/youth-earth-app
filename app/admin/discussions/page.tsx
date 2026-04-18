import { prisma } from "@/lib/prisma";
import { PublishToggle } from "@/components/admin/PublishToggle";
import Link from "next/link";
import a from "@/styles/admin.module.css";

export default async function AdminDiscussions() {
  const discussions = await prisma.discussion.findMany({
    include: { author: true, _count: { select: { replies: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className={a.pageHead}>
        <div>
          <h1 className={a.pageTitle}>Discussions</h1>
          <div className={a.pageSub}>{discussions.filter((x) => x.published).length} live · {discussions.length} total</div>
        </div>
      </div>
      <div className={a.body}>
        {discussions.length === 0 ? (
          <p className={a.empty}>No discussions yet.</p>
        ) : (
          <table className={a.table}>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Replies</th><th>Upvotes</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {discussions.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className={a.tdTitle}>{d.title}</div>
                    <div className={a.tdMeta}>{new Date(d.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div>{d.author.name}</div>
                    <div className={a.tdMeta}>{d.author.countryCode}</div>
                  </td>
                  <td className={a.tdMeta}>{d._count.replies}</td>
                  <td className={a.tdMeta}>{d.upvotes}</td>
                  <td>
                    <span className={`${a.badge} ${d.published ? a.badgeLive : a.badgeDraft}`}>
                      {d.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className={a.actions}>
                      <PublishToggle id={d.id} published={d.published} type="discussions" />
                      <Link href={`/discussions/${d.id}`} target="_blank"
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
