"use client";

import { Button } from "@/ui/atoms/Button/Button";
import EmptyStateBox from "@/ui/molecules/EmptyStateBox/EmptyStateBox";
import { AppHeader } from "@/ui/organisms/AppHeader/AppHeader";
import Card from "@/ui/organisms/Card/Card";
import React, { RefObject, useContext } from "react";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { useCardContext } from "@/hooks/useCardContext";
import { Plus } from "@icons";
import { NewCard, ICard } from "@/types/Card";
import * as Drawer from "@/ui/organisms/Drawer/Drawer";
import { open as openToast } from "@/ui/organisms/Toast/Toast";
import CardForm from "@/ui/pages/cards/CardForm";

export default function Cards() {
  const title = "Ajouter une nouvelle fiche";
  const { cards, editCard, deleteCard } = useCardContext();
  const [formElement, setFormRef] = React.useState<HTMLFormElement>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [actionLabel, setActionLabel] = React.useState("Créer la fiche");
  const { createCard } = useCardContext();

  console.log(cards);

  return (
    <div>
      <AppHeader title={"Fiches"}>
        <Drawer.Root
          title={title}
          onOpenChange={setIsDrawerOpen}
          open={isDrawerOpen}
        >
          <Drawer.Trigger asChild>
            <Button label={title} icon={<Plus size={16} />} position="left" />
          </Drawer.Trigger>

          {/* Drawer content */}
          <CardForm
            handleFormRef={setFormRef}
            handleSubmit={async (card: NewCard | ICard) => {
              setIsLoading(true);
              createCard(card);
              setIsLoading(false);
              setIsDrawerOpen(false);
            }}
          />

          <Drawer.Cancel label="Annuler" />
          <Drawer.Action>
            <Button
              label={actionLabel}
              disabled={isLoading}
              onClick={() => {
                formElement?.requestSubmit();
              }}
              loading={isLoading}
            />
          </Drawer.Action>
        </Drawer.Root>
      </AppHeader>

      <Stack className="p-10 flex justify-center" direction="col">
        {cards && cards.length > 0 && (
          <Stack direction={"col"} gapy={32}>
            {/* <Filter
              title="Filtrer par"
              data={cards}
              onFilter={(cards: ICard[]) => setCards(cards)}
              filters={[
                {
                  label: "Tag",
                  key: "tag",
                },
                {
                  label: "Categorie",
                  key: "category",
                },
              ]}
            /> */}
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  data={card}
                  onEdit={(card) => editCard(card)}
                  onDelete={(id) => deleteCard(id)}
                />
              ))}
            </div>
          </Stack>
        )}

        {cards && cards.length === 0 && (
          <Stack
            direction="row"
            align="center"
            justify="center"
            className="w-full"
          >
            <EmptyStateBox
              text="Oops vous n'avez aucune fiches"
              icon="Box"
              className="!w-full"
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
}
