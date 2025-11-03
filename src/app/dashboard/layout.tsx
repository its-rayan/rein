import MainNav from "@/components/layout/main-nav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
