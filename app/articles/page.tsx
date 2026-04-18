export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function Articles({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const articles = await prisma.article.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });
  const categories = ["All", "Climate policy", "Education", "Policy", "Community"];

  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Articles</span>
          <h1 className={s.pageTitle}>Essays from youth writers and educators.</h1>
          <p className={s.pageDek}>Long-form reporting, analysis, and first-person essays. Edited to publication standard.</p>
        </div>
      </header>
      <div className={s.container} style={{ padding: "48px 28px" }}>
        <div className={s.filters}>
          {categories.map((c) => (
            <Link key={c} href={c === "All" ? "/articles" : `/articles?category=${encodeURIComponent(c)}`}
              className={`${s.chip} ${(!category && c === "All") || category === c ? s.chipActive : ""}`}>{c}</Link>
          ))}
        </div>
        <div className={s.grid3}>
          {articles.map((a) => (
            <Link key={a.id} href={`/articles/${a.slug}`} className={s.articleCard}>
              <div className={s.placeholderImg} />
              <span className={s.eyebrow}>{a.category}</span>
              <h3 className={s.cardTitle}>{a.title}</h3>
              <span className={s.meta}>{a.author.name} · {a.author.countryCode} · {a.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
