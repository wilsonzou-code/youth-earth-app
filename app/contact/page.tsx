import s from "@/styles/pages.module.css";

const faqs = [
  { q: "Who can submit writing?", a: "Anyone 13–25 writing about climate or policy. We review everything; we publish roughly one in five submissions, with editorial notes for the rest." },
  { q: "Do you pay writers?", a: "Ambassadors receive a stipend. Submitted pieces outside the ambassador program are not paid; we cover fact-check and editing costs." },
  { q: "Can I submit in a language other than English?", a: "Yes. We publish in the original language and an English translation side by side. Translation is handled by our editorial team." },
  { q: "Do you accept anonymous submissions?", a: "We publish under a real name and country. In cases of personal risk, we've published under a verified pseudonym with a first-initial-only byline." },
];

export default function Contact() {
  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Contact</span>
          <h1 className={s.pageTitle}>Get in touch.</h1>
        </div>
      </header>
      <div className={s.containerSection}>
        <div className={s.contactGrid}>
          <aside>
            <h5 className={s.contactLabel}>Email</h5>
            <a href="mailto:editors@youth-x-earth.org" className={s.contactEmail}>editors@youth-x-earth.org</a>
            <h5 className={s.contactLabel} style={{ marginTop: 32 }}>Social</h5>
            <div className={s.contactSocials}>
              <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
              <a href="#" target="_blank" rel="noopener">RedNote</a>
            </div>
          </aside>
          <div>
            <h2 className={s.contactH}>FAQ</h2>
            <div className={s.faq}>
              {faqs.map((f, i) => (
                <details key={i} className={s.faqItem}>
                  <summary className={s.faqQ}>{f.q} <span>↓</span></summary>
                  <p className={s.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
