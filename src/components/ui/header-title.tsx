"use client";

import { usePathname } from "next/navigation";

export function HeaderTitle() {
  const pathName = usePathname();

  return (
    <h1 className="text-lg font-semibold md:text-2xl">
      {pathName === "/" && "Dashboard"}
      {pathName.endsWith("/campaigns") && "Campaigns"}
      {pathName.endsWith("/contacts") && "Contacts"}
      {pathName.endsWith("/leads-realtime") && "Real-time leads"}
      {pathName.endsWith("/leads-static") && "Find leads"}
    </h1>
  );
}
