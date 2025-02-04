"use client";

import { ICard } from "@/types/Card";
import { Category } from "@/types/Category";
import { Badge } from "@/ui/atoms/Badge/Badge";
import { Button } from "@/ui/atoms/Button/Button";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";
import EmptyStateBox from "@/ui/molecules/EmptyStateBox/EmptyStateBox";
import { AppHeader } from "@/ui/organisms/AppHeader/AppHeader";
import Card from "@/ui/organisms/Card/Card";
import CardForm from "@/ui/pages/cards/CardForm";
import { Edit, Eye, Pencil, Plus, Trash } from "@icons";
import * as Drawer from "@ui/organisms/Drawer/Drawer";
import React, { RefObject } from "react";
import { open as openAlert } from "@ui/organisms/Alert/Alert";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Text } from "@/ui/atoms/Text/Text";
import { open as openToast } from "@ui/organisms/Toast/Toast";
import * as Modal from "@ui/organisms/Modal/Modal";
import { CardFormTrigger } from "@/ui/pages/cards/CardFormTrigger";
import { CARDS } from "@/constants/cards";

export default function Cards() {
  const title = "Ajouter une nouvelle fiche";
  const [formRef, setFormRef] = React.useState<RefObject<HTMLFormElement>>();
  const [cards, setCards] = React.useState<ICard[]>(CARDS);

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const editCard = (id: string) => {
    console.log("Edit card", id);
  };

  const viewCard = (id: string) => {
    console.log("View card", id);
  };

  return (
    <div>
      <AppHeader title={"Fiches"}>
        <CardFormTrigger title={title}>
          <Button label={title} icon={<Plus size={16} />} position="left" />
        </CardFormTrigger>
      </AppHeader>

      <div className="p-10 flex justify-center">
        {cards.length > 0 && (
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                data={card}
                onEdit={editCard}
                onDelete={deleteCard}
              />
            ))}
          </div>
        )}

        {cards.length === 0 && (
          <EmptyStateBox text="Oops vous n'avez aucune fiches" icon="Box" />
        )}
      </div>
    </div>
  );
}
