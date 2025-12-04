import MainAppLayout from "@/components/layout/main-app-layout";
import AuthProvider from "@/components/providers/auth-provider";
import { Suspense } from "react";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AuthProvider>
        <MainAppLayout>{children}</MainAppLayout>
      </AuthProvider>
    </Suspense>
  );
}
