import MainNav from "@/components/layout/main-nav";
import AuthProvider from "@/components/providers/auth-provider";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <AuthProvider>
        <MainNav />
        <main className="mx-auto max-w-7xl pt-4">{children}</main>
      </AuthProvider>
    </div>
  );
}
