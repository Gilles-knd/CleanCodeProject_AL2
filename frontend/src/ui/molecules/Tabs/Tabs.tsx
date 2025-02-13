"use client";

import React from "react";
import classNames from "classnames";
import * as RadixTabs from "@radix-ui/react-tabs";
import { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "@radix-ui/react-tabs";

interface TabsProperties extends TabsProps {}

export function Tabs(props: TabsProperties) {
  const { children, className, ...rest } = props;
  const cn = classNames("flex flex-col space-y-4", className);

  return (
    <RadixTabs.Root className={cn} {...rest}>
      {children}
    </RadixTabs.Root>
  );
}

export const TabsList = (props: TabsListProps) => {
  const { children, ...rest } = props;
  return (
    <RadixTabs.List className={"flex flex-row p-1 rounded-xl border-solid border-[1px] border-gray-200 bg-gray-50 "}>
      {children}
    </RadixTabs.List>
  );
};

export const TabsTrigger = (props: TabsTriggerProps) => {
  const { children, ...rest } = props;
  return (
    <RadixTabs.Trigger
      className={
        "w-2/4 flex items-center justify-center py-1.5 px-3 rounded-lg text-gray-500 whitespace-pre font-medium text-xs hover:text-gray-700 hover:bg-gray-100 data-[state=active]:bg-primary-600 data-[state=active]:text-white"
      }
      {...rest}>
      {children}
    </RadixTabs.Trigger>
  );
};

export const TabsContent = (props: TabsContentProps) => {
  const { children, ...rest } = props;

  return <RadixTabs.Content {...rest}>{children}</RadixTabs.Content>;
};
