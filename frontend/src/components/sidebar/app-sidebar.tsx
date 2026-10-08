"use server";
import { UserButton } from "../auth/user/user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";

import { User, Sparkles, Settings } from "lucide-react";
import Link from "next/link";
import SidebarMenuItems from "./sidebar-menu-items";
import MobileSidebarClose from "./mobile-sidebar-close";
import Credits from "./credits";
async function AppSidebar() {
  return (
    <Sidebar className="from-background to-mute/20 bg-gradient-to0b border-r-0">
      <SidebarContent className="px-3">
        <MobileSidebarClose/>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary mt-6 mb-8 flex flex-col items-start justify-start px-2">
            <Link
              href="/"
              className="mb-1 flex cursor-pointer items-center gap-2"
            >
              <Sparkles className="text-primary h-6 w-6" />
              <p className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                AI Voice
              </p>
            </Link>
            <p className="text-muted-foreground ml-8 text-sm font-medium tracking-wide">
              Studio
            </p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
            <SidebarMenuItems/>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Credits/>
        <UserButton
          variant="outline"
          hideSettings={true}
          links={[
            {
              label: "Customer portal",
              href: "/dashboard/customer-portal",
              icon: <User />,
              //   visibility: "authenticated"
            },
            {
              label: "Settings",
              href: "/dashboard/settings",
              icon: <Settings className="h-4 w-4" />,
            },
          ]}
        ></UserButton>
      </SidebarFooter>

    </Sidebar>
  );
}

export default AppSidebar;
