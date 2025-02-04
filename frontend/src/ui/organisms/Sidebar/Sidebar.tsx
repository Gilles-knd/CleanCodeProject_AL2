"use client";

import React, { ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";
import Logo from "@ui/atoms/Logo/Logo";
import { Stack } from "@ui/layouts/Stack/Stack";
import { Button } from "@ui/atoms/Button/Button";
import { ScrollView } from "@ui/layouts/ScrollView/ScrollView";
import { usePathname, useRouter } from "next/navigation";

export interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps extends React.ComponentProps<"div"> {
  links: NavLink[];
}

export function Sidebar(props: SidebarProps) {
  const { className, links, ...rest } = props;
  const cn = classNames(
    "h-screen min-w-[15.3125rem] w-[15.3125rem] max-w-[15.3125rem] py-3",
    className
  );

  return (
    <Stack direction={"col"} className={cn} {...rest}>
      <SidebarHeader />

      <ScrollView className={"mt-14"}>
        <SidebarNav links={links} />
      </ScrollView>

      <SidebarFooter />
    </Stack>
  );
}

type SidebarHeaderProps = React.ComponentProps<"div">;
const SidebarHeader = (props: SidebarHeaderProps) => {
  const { className, ...rest } = props;
  const cn = classNames(
    "px-5 py-3 border-solid border-b-[1px] border-gray-200 h-16",
    className
  );
  return (
    <div className={cn} {...rest}>
      <Link href={""}>
        <Logo size={"md"} />
      </Link>
    </div>
  );
};

interface SidebarNavProps extends React.ComponentProps<"nav"> {
  links: NavLink[];
}
const SidebarNav = (props: SidebarNavProps) => {
  const { className, links, ...rest } = props;
  const cn = classNames("px-2.5", className);

  return (
    <nav className={cn} {...rest}>
      <ul
        className={
          "w-full flex flex-col items-start justify-start text-gray-600 space-y-2"
        }
      >
        {links.map((link, index) => (
          <li key={index} className={"w-full"}>
            <SidebarNavLink href={link.href}>
              {link.icon}
              <p>{link.name}</p>
            </SidebarNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

type SidebarNavLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};
const SidebarNavLink = (props: SidebarNavLinkProps) => {
  const { children, className, ...rest } = props;
  const pathname = usePathname();

  return (
    <Link
      {...rest}
      className={classNames(
        "w-full flex flex-row items-center space-x-4 px-4 py-2 rounded-xl hover:bg-zinc-100 hover:text-zinc-900 text-sm font-medium",
        className,
        { "text-zinc-900 bg-zinc-100": props.href === pathname }
      )}
    >
      {children}
    </Link>
  );
};

type SidebarFooterProps = React.ComponentProps<"div">;
const SidebarFooter = (props: SidebarFooterProps) => {
  const { className, ...rest } = props;
  const cn = classNames("px-2.5", className);
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className={cn} {...rest}>
      <Stack direction={"col"} gapy={14}>
        <Link href={""} className={"text-gray-700"}>
          <Button
            position={"left"}
            label={"Logout"}
            // icon={<LogOutRoundedIcon />}
            variant={"ghost"}
            onClick={() => {}}
            className={"!justify-start w-full"}
          />
        </Link>
      </Stack>
    </div>
  );
};
