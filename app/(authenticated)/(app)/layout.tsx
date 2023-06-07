import Link from "next/link";
import { BarChart, FileKey, Filter, FormInput, Keyboard, Menu, Tornado } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamSwitcher } from "./TeamSwitcher";
import { auth } from "@clerk/nextjs/app-beta";
import { notFound } from "next/navigation";
import { ChannelLink } from "./channelLink";
import { Logo } from "@/components/logo";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileNav } from "@/components/mobile-nav";
import { MobileSidebar } from "./MobileSidebar";
import { getTenantId } from "@/lib/auth";
import { Fragment } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const tenantId = getTenantId();

  return (
    <Fragment>
      <DesktopSidebar channels={[]} navigation={[]} />

      <MobileSidebar channels={[]} navigation={[]} />

      <div className=" lg:pl-72">{children}</div>
    </Fragment>
  );
}
