export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import s from "@/styles/pages.module.css";

export default async function Ambassadors() {
  const ambassadors = await prisma.ambassador.findMany({
    where: { active: true },
    include: { author: true },
    orderBy: { region: "asc" },
  });
  return (
    <div>
      <header className={s.pageHeaderInverse}>
        <div className={s.container}>
          <span className={s.eyebrowLight}>Ambassador program</span>
          <h1 className={s.pageTitle} style={{ color: "var(--fg-on-dark)" }}>Organize, write, and be paid for your time.</h1>
          <p className={s.pageDekInverse}>Ambassadors lead local reporting and discussions. We pay a stipend, cover costs, and publish what you write.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Link href="/submit" className={s.btnAccent}>Apply for 2026 cohort →</Link>
          </div>
        </div>
      </header>

      <section className={s.containerSection}>
        <span className={s.eyebrow}>What ambassadors do</span>
        <div className={s.threeCol} style={{ marginTop: 24 }}>
          {[
            { n: "01", title: "Lead local reporting", text: "Write two essays or letters per cohort, edited by our editorial team." },
            { n: "02", title: "Run community discussions", text: "Host one moderated discussion per quarter on a question you choose." },
            { n: "03", title: "Meet the cohort", text: "Monthly video calls, a stipend, and a named byline across every published piece." },
          ].map((f) => (
            <div key={f.n} className={s.feature}>
              <div className={s.featureNum}>{f.n}</div>
              <h3 className={s.featureTitle}>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.containerSection}>
        <div className={s.sectionHead}>
          <span className={s.eyebrow}>Current cohort</span>
          <span className={s.meta}>{ambassadors.length} ambassadors · 4 regions</span>
        </div>
        <div className={s.grid3}>
          {ambassadors.map((a) => (
            <div key={a.id} className={s.ambassadorCard}>
              <div className={s.placeholderSquare} />
              <div className={s.ambassadorName}>{a.author.name}</div>
              <div className={s.countryTag}>{a.author.countryCode} · {a.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
