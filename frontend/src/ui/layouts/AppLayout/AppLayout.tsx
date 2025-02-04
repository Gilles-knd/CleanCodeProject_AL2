import React from "react";
import classNames from "classnames";
import { NavLink, Sidebar } from "@ui/organisms/Sidebar/Sidebar";
import { ScrollView } from "@ui/layouts/ScrollView/ScrollView";

interface AppLayoutProps extends React.ComponentProps<"div"> {
  links: NavLink[];
}

export function AppLayout(props: AppLayoutProps) {
  const { children, className, links, ...rest } = props;
  const cn = classNames("w-full h-full flex flex-row bg-zinc-50", className);

  return (
    <section className={cn} {...rest}>
      <Sidebar links={links} />

      <section className={"w-full h-full py-3"}>
        <section
          className={
            "w-full h-full rounded-l-xl border-solid border-[1px] border-gray-200 shadow-sm bg-white"
          }
        >
          <ScrollView pb={81}>{children}</ScrollView>
        </section>
      </section>
    </section>
  );
}
