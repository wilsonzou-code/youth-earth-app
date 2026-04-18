import { prisma } from "@/lib/prisma";
import { MapView } from "@/components/MapView";
import s from "@/styles/pages.module.css";

export default async function MapPage() {
  const [articles, letters] = await Promise.all([
    prisma.article.findMany({ where: { published: true }, select: { id: true, slug: true, title: true, category: true, author: { select: { name: true, countryCode: true } } } }),
    prisma.letter.findMany({ where: { published: true }, select: { id: true, slug: true, title: true, category: true, author: { select: { name: true, countryCode: true } } } }),
  ]);

  const byCountry: Record<string, { articles: typeof articles; letters: typeof letters }> = {};
  for (const a of articles) {
    const cc = a.author.countryCode;
    if (!byCountry[cc]) byCountry[cc] = { articles: [], letters: [] };
    byCountry[cc].articles.push(a);
  }
  for (const l of letters) {
    const cc = l.author.countryCode;
    if (!byCountry[cc]) byCountry[cc] = { articles: [], letters: [] };
    byCountry[cc].letters.push(l);
  }

  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Map</span>
          <h1 className={s.pageTitle}>Where our contributors write from.</h1>
          <p className={s.pageDek}>Select a country to see its writers, letters, and active discussions.</p>
        </div>
      </header>
      <div className={s.containerSection}>
        <MapView byCountry={byCountry} />
      </div>
    </div>
  );
}
