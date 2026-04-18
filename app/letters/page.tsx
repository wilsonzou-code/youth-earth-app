import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function Letters() {
  const letters = await prisma.letter.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });
  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Letters</span>
          <h1 className={s.pageTitle}>Open letters, signed and published.</h1>
          <p className={s.pageDek}>Short public letters by young people, with author and country displayed.</p>
        </div>
      </header>
      <div className={s.container} style={{ padding: "48px 28px" }}>
        <div className={s.grid2}>
          {letters.map((l) => (
            <Link key={l.id} href={`/letters/${l.slug}`} className={s.letterCard}>
              <span className={s.eyebrow}>Letter · {l.category}</span>
              <h3 className={s.cardTitleSerif}>&ldquo;{l.title}&rdquo;</h3>
              <p className={s.excerpt}>{l.excerpt}</p>
              <div className={s.authorLine}>
                <span className={s.author}>{l.author.name}</span>
                <span className={s.countryTag}>{l.author.countryCode}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
