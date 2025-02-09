import { useFetch } from "@/hooks/useFetch";
import {
  createCardRequest,
  deleteCardRequest,
  getCards,
  updateCardRequest,
} from "@/services/fetch.service";
import { ICard, NewCard } from "@/types/Card";
import { LoadinSpinner } from "@/ui/molecules/LoadingSpinner/LoadingSpinner";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";
import React, { ReactNode, useState } from "react";
import { open as openToast } from "@ui/organisms/Toast/Toast";

interface CardContextProps {
  cards: ICard[];
  createCard: (card: NewCard) => void;
  editCard: (updatedCard: ICard) => void;
  deleteCard: (id: string) => void;
}

export const CardContext = React.createContext<CardContextProps>({
  cards: [],
  createCard: (card: NewCard) => {},
  editCard: (updatedCard: ICard) => {},
  deleteCard: (id: string) => {},
});

export function CardProvider({ children }: { children: ReactNode }) {
  const { isLoading, data, error } = useFetch<ICard[]>("cards", getCards);
  const [cards, setCards] = React.useState<ICard[]>([]);

  const createCard = async (card: NewCard) => {
    setCards((prev) => [...prev, res]);

    const res = await createCardRequest(card);
    if (res.id) {
      openToast({
        title: "Success",
        style: "success",
        description: "Votre fiche a bien été créer",
      });
    } else {
      openToast({
        title: "Oops",
        style: "error",
        description:
          "Une erreur c'est produite lors de la création d'une votre fiche",
      });
    }
  };

  const editCard = async (updatedCard: ICard) => {
    const data = await updateCardRequest(updatedCard);

    if (data.id) {
      const ucards = cards.filter(card => card.id !== updatedCard.id);
      openToast({
        title: "Fiche modifiée",
        description: "La fiche a bien été modifiée",
        style: "success",
        duration: 5000,
        dismissible: true,
      });
      setCards([...ucards, {...updatedCard, ...data}]);
    } else {
      openToast({
        title: "Oops",
        description:
          "Une erreur c'est produite lors de la modification de la fiche. Réessayer plus tard",
        style: "error",
        duration: 5000,
        dismissible: true,
      });
    }
  };

  const deleteCard = async (id: string) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);

    const res = await deleteCardRequest(id);
    if (res.ok) {
      openToast({
        title: "Fiche supprimée",
        description: "La fiche a bien été supprimée",
        style: "success",
        duration: 5000,
        dismissible: true,
      });
    } else {
      openToast({
        title: "Oops",
        description:
          "Une erreur c'est produite lors de la suppression de la fiche. Réessayer plustard",
        style: "error",
        duration: 5000,
        dismissible: true,
      });
    }
  };

  React.useEffect(() => {
    if (!isLoading && data) {
      setCards(data);
    }
  }, [data]);

  if (error) {
    return (
      <div>Oops une erreur c'est produite. Veuillez ressayer plus tard </div>
    );
  }

  return (
    <CardContext.Provider value={{ cards, createCard, deleteCard, editCard }}>
      <VisibilityToggle visible={!isLoading}>{children}</VisibilityToggle>
      <VisibilityToggle visible={isLoading}>
        <LoadinSpinner />
      </VisibilityToggle>
    </CardContext.Provider>
  );
}
