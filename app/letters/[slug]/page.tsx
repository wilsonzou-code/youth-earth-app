import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function LetterDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const letter = await prisma.letter.findUnique({
    where: { slug, published: true },
    include: { author: true },
  });
  if (!letter) notFound();

  return (
    <article className={s.letterBody}>
      <Link href="/letters" className={s.backlink}>← Back to letters</Link>
      <span className={s.eyebrow}>Letter · {letter.category}</span>
      <h1 className={s.letterTitle}>&ldquo;{letter.title}&rdquo;</h1>
      <div className={s.prose}>
        {letter.body.split("\n\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className={s.letterSignoff}>
        <div className={s.letterAuthor}>— {letter.author.name}</div>
        <div className={s.countryTag}>{letter.author.countryCode} · {letter.publishedAt ? new Date(letter.publishedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "2026"}</div>
      </div>
    </article>
  );
}
