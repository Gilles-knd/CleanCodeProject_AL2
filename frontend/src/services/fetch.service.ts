import { ICard, NewCard } from "@/types/Card";
import { http } from "./init.service";
import { CARDS } from "@/constants/cards";

export async function getCards<T>(): Promise<T> {
  return await http.get<T>("/cards");
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(CARDS as T), 2000);
  //   if (!CARDS) {
  //     reject();
  //   }
  // });
}

export async function createCardRequest(card: NewCard) {
  return await http.post<ICard>("/cards", card);
}

export async function updateCardRequest(card: ICard) {
  return await http.put<ICard>(`/cards/${card.id}`, card);
}

export async function deleteCardRequest(id: string): Promise<{ ok: boolean }> {
  return await http.delete(`/cards/${id}`);
}

export async function getTodayQuizzRequest() {
  const date = new Date();
  date.setDate(13);
  const formattedDate = date.toISOString().split("T")[0];

  return await http.get<ICard[]>(`/cards/quizz?date=${formattedDate}`);
}

export async function answerQuestionRequest(
  id: string,
  body: { isValid: boolean }
): Promise<{ ok: boolean }> {
  return await http.patch<ICard[]>(`/cards/${id}/answer`, body);
}
