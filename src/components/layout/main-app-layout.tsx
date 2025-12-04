import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { getCurrentSessionUser } from "@/lib/auth/session";
import { notFound } from "next/navigation";

export default async function MainAppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentSessionUser();
  if (!user) {
    notFound();
  }

  console.log("MainAppLayout user:", user);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            {/* <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            /> */}
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="mx-auto w-full max-w-xl">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
