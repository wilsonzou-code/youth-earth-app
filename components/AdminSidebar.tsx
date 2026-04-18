"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import a from "@/styles/admin.module.css";

const nav = [
  { href: "/admin",             label: "Dashboard",   icon: "▤" },
  { href: "/admin/submissions", label: "Submissions",  icon: "📥" },
  { href: "/admin/articles",    label: "Articles",     icon: "📄" },
  { href: "/admin/letters",     label: "Letters",      icon: "✉" },
  { href: "/admin/discussions", label: "Discussions",  icon: "💬" },
];

export function AdminSidebar({ user }: { user?: { name?: string | null; email?: string | null } }) {
  const path = usePathname();
  return (
    <aside className={a.sidebar}>
      <div className={a.sidebarLogo}>
        <Link href="/" className={a.sidebarBrand}>Youth<em>×</em>Earth</Link>
        <span className={a.sidebarBadge}>Admin</span>
      </div>
      <nav className={a.sidebarNav}>
        {nav.map((n) => {
          const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={`${a.navItem} ${active ? a.navActive : ""}`}>
              <span className={a.navIcon}>{n.icon}</span> {n.label}
            </Link>
          );
        })}
      </nav>
      <div className={a.sidebarFooter}>
        <div className={a.sidebarUser}>
          <div className={a.sidebarUserName}>{user?.name ?? "Editor"}</div>
          <div className={a.sidebarUserEmail}>{user?.email}</div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className={a.signOutBtn}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
