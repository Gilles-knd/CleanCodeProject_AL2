import { useContext } from 'react';
import { CardContext } from "@/context/card.context";

export function useCardContext() {
    return useContext(CardContext);
}