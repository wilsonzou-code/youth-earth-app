import { prisma } from "@/lib/prisma";
import { PublishToggle } from "@/components/admin/PublishToggle";
import Link from "next/link";
import a from "@/styles/admin.module.css";

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className={a.pageHead}>
        <div>
          <h1 className={a.pageTitle}>Articles</h1>
          <div className={a.pageSub}>{articles.filter((x) => x.published).length} live · {articles.length} total</div>
        </div>
      </div>
      <div className={a.body}>
        {articles.length === 0 ? (
          <p className={a.empty}>No articles yet. Approve a submission to publish one.</p>
        ) : (
          <table className={a.table}>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Category</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className={a.tdTitle}>{article.title}</div>
                    <div className={a.tdMeta}>{article.readTime}</div>
                  </td>
                  <td>
                    <div>{article.author.name}</div>
                    <div className={a.tdMeta}>{article.author.countryCode}</div>
                  </td>
                  <td><span className={a.badge} style={{ background: "var(--yxe-sand-200)", color: "var(--fg-2)" }}>{article.category}</span></td>
                  <td>
                    <span className={`${a.badge} ${article.published ? a.badgeLive : a.badgeDraft}`}>
                      {article.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className={a.actions}>
                      <PublishToggle id={article.id} published={article.published} type="articles" />
                      <Link href={`/articles/${article.slug}`} target="_blank"
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
