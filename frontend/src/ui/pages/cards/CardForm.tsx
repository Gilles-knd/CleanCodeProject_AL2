import { ICard, NewCard } from "@/types/Card";
import { Category } from "@/types/Category";
import { TextBox } from "@/ui/atoms/Inputs/TextBox/TextBox";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Label } from "@/ui/atoms/Label/Label";
import { Stack } from "@/ui/layouts/Stack/Stack";
import React from "react";

interface CardFormData {
  data?: ICard;
  handleFormRef: CallableFunction;
  handleSubmit: CallableFunction;
}

export default function CardForm(props: CardFormData) {
  const { data, handleFormRef, handleSubmit } = props;
  const formRef = React.useRef(null);
  const [card, setCard] = React.useState<NewCard>({
    question: data?.question ?? "",
    answer: data?.answer ?? "",
    tag: data?.tag ?? "",
  });

  const onSubmit = (formData: FormData) => {
    if (!formRef.current) return;

    const card = {
      question: formData.get("question") || "",
      answer: formData.get("answer") || "",
      tag: formData.get("tag") || "",
    };

    if (data) {
      card.id = data.id;
    }
    handleSubmit(card);
  };

  React.useEffect(() => {
    if (formRef.current) {
      handleFormRef(formRef.current);
    }
  }, [formRef]);

  return (
    <form className="space-y-4" ref={formRef} action={onSubmit}>
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
          required
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
          required
        />
      </Stack>

      {data && data.tag && (
        <Stack direction="col" gapy={8}>
          <Label text={"Tag"} />
          <TextField
            type="text"
            name="tag"
            id="tag-field"
            placeholder="Example: TeamWork"
            className="bg-zinc-100 font-medium"
            onChange={(e) => setCard({ ...card, tag: e.target.value })}
            value={card.tag}
          />
        </Stack>
      )}

      {!data && (
        <Stack direction="col" gapy={8}>
          <Label text={"Tag (Facultatif)"} />
          <TextField
            type="text"
            name="tag"
            id="tag-field"
            placeholder="Example: TeamWork"
            disabled={data ? true : false}
            className="bg-zinc-100 font-medium"
            onChange={(e) => setCard({ ...card, tag: e.target.value })}
            value={card.tag}
          />
        </Stack>
      )}
    </form>
  );
}
