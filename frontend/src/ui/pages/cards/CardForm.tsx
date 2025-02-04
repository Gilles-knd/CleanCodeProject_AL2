import { ICard, NewCard } from "@/types/Card";
import { Category } from "@/types/Category";
import { TextBox } from "@/ui/atoms/Inputs/TextBox/TextBox";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Label } from "@/ui/atoms/Label/Label";
import { Stack } from "@/ui/layouts/Stack/Stack";
import React from "react";

interface CardFormData {
  data?: NewCard;
}

export default function CardForm(props: CardFormData) {
  const { data } = props;
  const [card, setCard] = React.useState<NewCard>({
    question: data?.question ?? "",
    answer: data?.answer ?? "",
    category: data?.category ?? Category.FIRST,
    tag: data?.tag ?? "",
  });


  return (
    <form className="space-y-4">
      <Stack direction="col" gapy={8}>
        <Label text={"Question"} htmlFor="question-field" />
        <TextBox
          placeholder="Question"
          name="question"
          id="question-field"
          value={card.question}
          onChange={(e) => setCard({ ...card, question: e.target.value })}
          className="bg-zinc-100 font-medium"
          rows={2}
        />
      </Stack>

      <Stack direction="col" gapy={8}>
        <Label text={"Entrer la réponse"} htmlFor="answer-field" />
        <TextBox
          placeholder="Réponse"
          name="answer"
          id="answer-field"
          value={card.answer}
          onChange={(e) => setCard({ ...card, answer: e.target.value })}
          className="bg-zinc-100 font-medium"
        />
      </Stack>
      
      {data && data.tag && (
        <Stack direction="col" gapy={8}>
          <Label text={"Tag"} />
          <TextField
            type="text"
            placeholder="Example: TeamWork"
            className="bg-zinc-100 font-medium"
            value={card.tag}
          />
        </Stack>
      )}

      {!data && (
        <Stack direction="col" gapy={8}>
          <Label text={"Tag (Facultatif)"} />
          <TextField
            type="text"
            placeholder="Example: TeamWork"
            disabled={data ? true : false}
            className="bg-zinc-100 font-medium"
            value={card.tag}
          />
        </Stack>
      )}
    </form>
  );
}
