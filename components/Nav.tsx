"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/discussions", label: "Discussions" },
  { href: "/letters", label: "Letters" },
  { href: "/map", label: "Map" },
  { href: "/ambassadors", label: "Ambassadors" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Youth<em>×</em>Earth
      </Link>
      <div className={styles.links}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? styles.active : ""}>
            {l.label}
          </Link>
        ))}
      </div>
      <Link href="/submit" className={styles.cta}>Submit your writing</Link>
    </nav>
  );
}
