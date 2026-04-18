import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";
import { ReplyForm } from "@/components/ReplyForm";

export default async function DiscussionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await prisma.discussion.findUnique({
    where: { id },
    include: { author: true, replies: { include: { author: true }, orderBy: { createdAt: "asc" } } },
  });
  if (!d) notFound();

  return (
    <article className={s.discussionBody}>
      <Link href="/discussions" className={s.backlink}>← Back to discussions</Link>
      <div className={s.discussionHead}>
        <div className={s.avatarLg}>{d.author.name[0]}</div>
        <div>
          <div className={s.author}>{d.author.name} <span className={s.countryTag}>· {d.author.countryCode}</span></div>
          <div className={s.meta}>{new Date(d.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
      <h1 className={s.discussionTitle}>{d.title}</h1>
      <div className={s.prose}>
        {d.body.split("\n\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className={s.actions}>
        <span className={s.upvoteStatic}>↑ {d.upvotes}</span>
        <span className={s.replyCount}>💬 {d.replies.length} replies</span>
      </div>
      <hr style={{ margin: "24px 0" }} />
      <h3 className={s.repliesHead}>Replies</h3>
      {d.replies.map((r) => (
        <div key={r.id} className={s.reply}>
          <div className={s.replyHead}>
            <strong>{r.author.name}</strong>
            <span className={s.countryTag}>· {r.author.countryCode}</span>
            <span className={s.meta} style={{ marginLeft: "auto" }}>{new Date(r.createdAt).toLocaleDateString()}</span>
          </div>
          <p>{r.body}</p>
        </div>
      ))}
      <ReplyForm discussionId={d.id} />
    </article>
  );
}
