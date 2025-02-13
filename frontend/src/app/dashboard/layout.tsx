"use client";

import { AppLayout } from "@/ui/layouts/AppLayout/AppLayout";
import React, { ReactNode } from "react";
import links from "@/constants/links";
import { CardProvider } from "@/context/card.context";

export default function DashboardLayout(props: { children: ReactNode }) {
  const { children } = props;
  const navLink = links;

  return (
    <CardProvider>
      <AppLayout links={navLink}>
        <div className="h-full w-full pb-10 space-y-10">{children}</div>
      </AppLayout>
    </CardProvider>
  );
}
