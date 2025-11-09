import MainNav from "@/components/layout/main-nav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <main className="mx-auto max-w-7xl pt-4">{children}</main>
    </div>
  );
}
