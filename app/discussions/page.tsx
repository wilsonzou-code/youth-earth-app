import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function Discussions() {
  const discussions = await prisma.discussion.findMany({
    where: { published: true },
    include: { author: true, _count: { select: { replies: true } } },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Discussions</span>
          <h1 className={s.pageTitle}>Moderated conversations, in public.</h1>
          <p className={s.pageDek}>Working through hard questions out loud, with authors signed and countries shown.</p>
        </div>
      </header>
      <div className={s.container} style={{ padding: "48px 28px" }}>
        <div className={s.stack}>
          {discussions.map((d) => (
            <Link key={d.id} href={`/discussions/${d.id}`} className={s.discussionCard}>
              <div className={s.discussionHead}>
                <div className={s.avatar}>{d.author.name[0]}</div>
                <div>
                  <div className={s.author}>{d.author.name} <span className={s.countryTag}>· {d.author.countryCode}</span></div>
                  <div className={s.meta}>{new Date(d.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <h3 className={s.cardTitle}>{d.title}</h3>
              <div className={s.engagement}>
                <span><strong>{d._count.replies}</strong> replies</span>
                <span><strong>{d.upvotes}</strong> upvotes</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
