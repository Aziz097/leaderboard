"use client";

import { Provider } from "@/components/providers";
import { DashboardSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="text-white/60">Dashboard</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/dashboard" className="text-white/60 hover:text-white">
            Dashboard
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-white/40" />
      <BreadcrumbItem>
        <BreadcrumbPage className="text-white">
          {segments[1].charAt(0).toUpperCase() + segments[1].slice(1).replace(/-/g, " ")}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 bg-background/20 backdrop-blur-xl px-4">
            <SidebarTrigger className="text-white/70 hover:text-white" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbNav />
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Provider>
  );
}
