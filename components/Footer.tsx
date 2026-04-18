import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>Youth<em>×</em>Earth</div>
          <p className={styles.tag}>Young people and educators, writing the climate story together.</p>
          <div className={styles.socials}>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="RedNote" className={styles.rednote}>红</a>
          </div>
        </div>
        <div className={styles.col}>
          <h5>Read</h5>
          <Link href="/articles">Articles</Link>
          <Link href="/letters">Letters</Link>
          <Link href="/discussions">Discussions</Link>
        </div>
        <div className={styles.col}>
          <h5>Join</h5>
          <Link href="/ambassadors">Ambassadors</Link>
          <Link href="/submit">Submit</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.col}>
          <h5>About</h5>
          <Link href="/about">Our story</Link>
          <a href="#">Press</a>
        </div>
      </div>
      <div className={styles.legal}>
        <span>© 2026 Youth × Earth</span>
        <span>Young people, writing the climate story.</span>
      </div>
    </footer>
  );
}
