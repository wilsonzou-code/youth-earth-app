import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [articles, letters] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      select: { id: true, slug: true, title: true, category: true, author: { select: { name: true, countryCode: true } } },
    }),
    prisma.letter.findMany({
      where: { published: true },
      select: { id: true, slug: true, title: true, category: true, author: { select: { name: true, countryCode: true } } },
    }),
  ]);

  // Group by country code
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

  return NextResponse.json(byCountry);
}
