import { DesktopSidebar } from "./DesktopSidebar";
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
