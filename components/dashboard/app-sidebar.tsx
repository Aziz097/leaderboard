"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, LogOut, TrendingUp, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mainNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Aktivitas",
    href: "/dashboard/aktivitas",
    icon: TrendingUp,
  },
];

const donaturNavItems = [
  {
    title: "Daftar Donatur",
    href: "/dashboard/daftar-donatur",
    icon: Users,
  },
  {
    title: "Tambah Donatur",
    href: "/dashboard/tambah-donatur",
    icon: PlusCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      toast.success("Berhasil logout");
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 500);
    } catch {
      toast.error("Gagal logout");
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar className="border-white/10 bg-background/30 backdrop-blur-xl">
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <div className="flex items-center gap-2 px-3 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-white text-lg">Leaderboard</span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-all duration-200",
                          isActive
                            ? "bg-white/10 text-white shadow-lg shadow-accent-primary/10"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 px-3 py-2">
            Donatur
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {donaturNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-all duration-200",
                          isActive
                            ? "bg-white/10 text-white shadow-lg shadow-accent-primary/10"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 bg-background/20 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-50"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4" />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
