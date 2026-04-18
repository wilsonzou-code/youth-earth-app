export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function Home() {
  const [articles, letters, discussions] = await Promise.all([
    prisma.article.findMany({ where: { published: true }, include: { author: true }, orderBy: { publishedAt: "desc" }, take: 4 }),
    prisma.letter.findMany({ where: { published: true }, include: { author: true }, orderBy: { publishedAt: "desc" }, take: 2 }),
    prisma.discussion.findMany({ where: { published: true }, include: { author: true, _count: { select: { replies: true } } }, orderBy: { createdAt: "desc" }, take: 2 }),
  ]);

  const [featured, ...secondary] = articles;
  const COUNTRIES = ["NGA","BRA","IND","IDN","TWN","GHA","DEU","COL","KEN","USA","MEX","PHL","ZAF","EGY","VNM"];

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.kicker}><span className={styles.dot} /> Issue 04 · April 2026</div>
          <h1 className={styles.heroTitle}>A publication of youth climate writing, from 23 countries.</h1>
          <p className={styles.heroDek}>
            Youth × Earth publishes essays, open letters, and moderated discussions by young people
            working on climate and policy — written for readers who want primary voices, not summaries.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/submit" className={styles.btnPrimary}>Submit your writing →</Link>
            <Link href="/ambassadors" className={styles.btnSecondary}>Join the ambassador program</Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>This week</span>
            <Link href="/articles" className={styles.more}>All articles →</Link>
          </div>
          <div className={styles.featuredGrid}>
            <Link href={`/articles/${featured.slug}`} className={styles.featuredMain}>
              <div className={styles.placeholder} style={{ aspectRatio: "16/9" }} />
              <span className={styles.eyebrow}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              {featured.dek && <p className={styles.featuredDek}>{featured.dek}</p>}
              <span className={styles.meta}>{featured.author.name} · {featured.author.countryCode} · {featured.readTime}</span>
            </Link>
            <div className={styles.featuredSide}>
              {secondary.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className={styles.articleCard}>
                  <div className={styles.placeholderSm} />
                  <span className={styles.eyebrow}>{a.category}</span>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <span className={styles.meta}>{a.author.name} · {a.author.countryCode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.strip}>
        <div className={styles.stripInner}>
          <span className={styles.stripLabel}>Voices from</span>
          <span className={styles.stripNumber}>23</span>
          <span className={styles.stripLabel}>countries, and growing.</span>
          <div className={styles.stripCountries}>
            {COUNTRIES.slice(0, 12).map((c) => <span key={c} className={styles.country}>{c}</span>)}
            <Link href="/map" className={`${styles.country} ${styles.countryMore}`}>+11</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div>
            <span className={styles.eyebrow}>Letters</span>
            <h2 className={styles.sectionTitle}>Open letters from young writers.</h2>
            <p className={styles.sectionText}>Short, public, signed with name and country. Published weekly.</p>
            <div className={styles.stack}>
              {letters.map((l) => (
                <Link key={l.id} href={`/letters/${l.slug}`} className={styles.letterCard}>
                  <span className={styles.eyebrow}>Letter · {l.category}</span>
                  <h3 className={styles.cardTitleSerif}>&ldquo;{l.title}&rdquo;</h3>
                  <p className={styles.excerpt}>{l.excerpt}</p>
                  <div className={styles.authorLine}>
                    <span className={styles.author}>{l.author.name}</span>
                    <span className={styles.countryTag}>{l.author.countryCode}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/letters" className={styles.inlineLink}>Read all letters →</Link>
          </div>
          <div>
            <span className={styles.eyebrow}>Discussions</span>
            <h2 className={styles.sectionTitle}>Moderated conversations.</h2>
            <p className={styles.sectionText}>Forums for working through hard questions in public.</p>
            <div className={styles.stack}>
              {discussions.map((d) => (
                <Link key={d.id} href={`/discussions/${d.id}`} className={styles.discussionCard}>
                  <div className={styles.discussionHead}>
                    <div className={styles.avatar}>{d.author.name[0]}</div>
                    <div>
                      <div className={styles.author}>{d.author.name}</div>
                      <div className={styles.countryTag}>· {d.author.countryCode}</div>
                    </div>
                  </div>
                  <h4 className={styles.cardTitle}>{d.title}</h4>
                  <div className={styles.engagement}>
                    <span><strong>{d._count.replies}</strong> replies</span>
                    <span><strong>{d.upvotes}</strong> upvotes</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/discussions" className={styles.inlineLink}>See all discussions →</Link>
          </div>
        </div>
      </section>

      <section className={styles.callout}>
        <div className={styles.calloutInner}>
          <div>
            <span className={styles.eyebrowLight}>Ambassador program</span>
            <h2 className={styles.calloutTitle}>Organize, write, and be paid for your time.</h2>
            <p className={styles.calloutText}>Ambassadors lead local reporting and community discussions. Applications open through May.</p>
            <Link href="/ambassadors" className={styles.btnAccent}>Read the program brief →</Link>
          </div>
          <div className={styles.calloutStat}>
            <div className={styles.calloutNum}>47</div>
            <div className={styles.calloutCaption}>ambassadors across four regions</div>
          </div>
        </div>
      </section>
    </div>
  );
}
