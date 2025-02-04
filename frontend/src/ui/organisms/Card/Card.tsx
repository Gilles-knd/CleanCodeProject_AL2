import classNames from "classnames";
import React from "react";
import { ICard } from "@/types/Card";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";
import { Pencil, Trash } from "@icons";
import { CardFormTrigger } from "@/ui/pages/cards/CardFormTrigger";
import { Badge } from "@/ui/atoms/Badge/Badge";
import { open as openAlert } from "@ui/organisms/Alert/Alert";
import { open as openToast } from "@ui/organisms/Toast/Toast";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Text } from "@/ui/atoms/Text/Text";

export interface CardProps extends React.ComponentProps<"div"> {
  data: ICard;
  onEdit: CallableFunction;
  onDelete: CallableFunction;
}

export default function Card(props: CardProps) {
  const { className, data, onEdit, onDelete, ...rest } = props;
  const cn = classNames(
    "w-full bg-zinc-50 border-solid border-[1px] border-zinc-100 p-4 rounded-2xl space-y-2",
    className
  );

  return (
    <div className="w-full p-2 space-y-2 border border-solid rounded-3xl shadow">
      <div className={cn} {...rest}>
        <h4 className={"text-zinc-900 text-lg font-medium truncate"}>{data.question}</h4>
        <p className={"text-sm text-gray-600 truncate"}>{data.answer}</p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <CardFormTrigger title={"Mettre à jour la fiche"} data={data} actionLabel={"Mettre à jour"}>
            <ButtonIcon
              size="md"
              variant={"ghost"}
              rounded
              icon={<Pencil size={16} />}
              className="bg-zinc-50 !text-zinc-600"
              onClick={() => onEdit(data.id)}
            />
          </CardFormTrigger>

          <ButtonIcon
            size="md"
            variant={"ghost"}
            className="bg-zinc-50 !text-zinc-600"
            rounded
            icon={<Trash size={16} />}
            onClick={() => {
              openAlert({
                actionStyle: "danger",
                content: (
                  <Stack direction={"row"}>
                    <Text>
                      Vous vous apprêtez à supprimer cette fiche. Êtes-vous sûr
                      de vouloir continuer ?
                    </Text>
                  </Stack>
                ),
                action: (close: any) => {
                  onDelete(data.id);
                  openToast({
                    title: "Fiche supprimée",
                    description: "La fiche a bien été supprimée",
                    style: "success",
                    duration: 5000,
                    dismissible: true,
                  });
                  close();
                },
              });
            }}
          />
        </div>

        <div className="flex flex-row space-x-1">
          {<Badge type={"success"} text={data.category} />}
          {data.tag && <Badge type={"primary"} text={data.tag} />}
        </div>
      </div>
    </div>
  );
}
