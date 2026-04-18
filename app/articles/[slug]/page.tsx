import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    include: { author: true },
  });
  if (!article) notFound();

  return (
    <article className={s.articleBody}>
      <Link href="/articles" className={s.backlink}>← Back to articles</Link>
      <span className={s.eyebrow}>{article.category}</span>
      <h1 className={s.articleTitle}>{article.title}</h1>
      {article.dek && <p className={s.articleDek}>{article.dek}</p>}
      <div className={s.byline}>
        <span><strong>{article.author.name}</strong></span>
        <span>{article.author.countryCode}</span>
        {article.readTime && <span>{article.readTime}</span>}
        {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>}
      </div>
      <div className={s.placeholderImgWide} />
      <div className={s.prose}>
        {article.body.split("\n\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        <blockquote>We are not the future. We are the present, and we are writing.</blockquote>
      </div>
    </article>
  );
}
