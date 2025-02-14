"use client";

import { Button } from "@/ui/atoms/Button/Button";
import EmptyStateBox from "@/ui/molecules/EmptyStateBox/EmptyStateBox";
import { AppHeader } from "@/ui/organisms/AppHeader/AppHeader";
import Card from "@/ui/organisms/Card/Card";
import React, { RefObject, useCallback, useContext } from "react";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { useCardContext } from "@/hooks/useCardContext";
import { Plus } from "@icons";
import { NewCard, ICard } from "@/types/Card";
import * as Drawer from "@/ui/organisms/Drawer/Drawer";
import CardForm from "@/ui/pages/cards/CardForm";
import { Filter } from "@/ui/pages/cards/Filter";
import { Category } from "@/types/Category";

export default function Cards() {
  const title = "Ajouter une nouvelle fiche";
  const { cards: data, editCard, deleteCard, createCard } = useCardContext();
  const [formElement, setFormRef] = React.useState<HTMLFormElement>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [actionLabel, setActionLabel] = React.useState("Créer la fiche");
  const [cards, setCards] = React.useState<ICard[]>(data);

  React.useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data]);

  const handleFilter = useCallback((filteredCards: ICard[]) => {
    setCards(filteredCards);
  }, []);

  return (
    <div>
      <AppHeader title={"Fiches"}>
        <Drawer.Root
          title={title}
          onOpenChange={setIsDrawerOpen}
          open={isDrawerOpen}
        >
          <Drawer.Trigger asChild>
            <Button
              label={title}
              icon={<Plus size={16} />}
              position="left"
              id="open-card-drawer"
            />
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
              id="create-card"
              onClick={() => {
                formElement?.requestSubmit();
              }}
              loading={isLoading}
            />
          </Drawer.Action>
        </Drawer.Root>
      </AppHeader>

      <Stack className="p-10 flex justify-center" direction="col" gapy={32}>
        <Filter
          title="Filtrer par"
          data={data}
          onFilter={handleFilter}
          filters={[
            {
              label: "Tag",
              key: "tag",
            },
            {
              label: "Categorie",
              key: "category",
              values: [
                Category.FIRST,
                Category.SECOND,
                Category.THIRD,
                Category.FOURTH,
                Category.FIFTH,
                Category.SIXTH,
                Category.SEVENTH,
              ],
            },
          ]}
        />
        {cards && cards.length > 0 && (
          <ul
            className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            id="card-list"
          >
            {cards.map((card) => (
              <li id="card-list-item" key={card.id}>
                <Card
                  data={card}
                  onEdit={(card) => editCard(card)}
                  onDelete={(id) => deleteCard(id)}
                />
              </li>
            ))}
          </ul>
        )}

        {cards && cards.length === 0 && (
          <Stack
            direction="row"
            align="center"
            justify="center"
            className="w-full"
          >
            <EmptyStateBox
              text="Oops rien à afficher ici pour l'instant !"
              icon="Box"
              className="!w-full"
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
}
