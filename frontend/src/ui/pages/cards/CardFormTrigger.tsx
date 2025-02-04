import * as Drawer from "@ui/organisms/Drawer/Drawer";
import React from "react";
import { Button } from "@ui/atoms/Button/Button";
import CardForm from "./CardForm";
import { NewCard } from "@/types/Card";

export function CardFormTrigger(props: {
  children: React.ReactNode;
  title: string;
  data?: NewCard;
  actionLabel?: string;
}) {
  const { children, data, actionLabel = "Créer la fiche", title } = props;
  return (
    <Drawer.Root title={title}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>

      {/* Drawer content */}
      <CardForm data={data} />

      <Drawer.Cancel label="Annuler" />
      <Drawer.Action>
        <Button label={actionLabel} disabled />
      </Drawer.Action>
    </Drawer.Root>
  );
}
