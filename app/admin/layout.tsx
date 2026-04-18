import { auth } from "@/auth";
import { AdminSidebar } from "@/components/AdminSidebar";
import a from "@/styles/admin.module.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login page renders without the shell
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className={a.shell}>
      <AdminSidebar user={session.user} />
      <main className={a.content}>{children}</main>
    </div>
  );
}
