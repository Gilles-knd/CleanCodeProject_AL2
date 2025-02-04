import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@ui/atoms/Button/Button";
import React, { ReactElement, ReactNode } from "react";
import { DialogCloseProps, DialogProps, DialogTriggerProps } from "@radix-ui/react-dialog";
import classNames from "classnames";
import { ButtonIcon } from "@ui/atoms/ButtonIcon/ButtonIcon";
import { XIcon } from "lucide-react";
import { Overlay } from "@ui/atoms/Overlay/Overlay";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface ModalProps extends DialogProps {
  title: string;
}

export function Root(props: ModalProps) {
  const { children, title, ...rest } = props;
  let closeButton = null;
  let actionButton = null;
  let content: string | ReactNode[] = [];
  let trigger = null;

  React.Children.forEach(children, (child: any) => {
    if (child.type === Cancel) {
      closeButton = child;
    } else if (child.type === Action) {
      actionButton = child;
    } else if (child.type === Trigger) {
      trigger = child;
    } else {
      content.push(child);
    }
  });

  return (
    <Dialog.Root {...rest}>
      {trigger}
      <Dialog.Portal>
        <Overlay />
        <Dialog.Content
          className={"fixed left-0 top-0 bottom-0 right-0 z-10 flex flex-col items-center justify-center"}>
          
          <VisuallyHidden>
            <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
          </VisuallyHidden>
          <div
            className={
              "w-full max-w-[30rem] border-solid border-[1px] border-gray-200 bg-white z-10 rounded-2xl shadow-modal"
            }>
            {/*Moda Header*/}
            <header className={"h-12 flex items-center justify-between px-4 "}>
              <h3 className={"text-sm font-medium capitalize text-gray-800"}>{title}</h3>
              <Dialog.Close asChild>
                <ButtonIcon icon={<XIcon />} variant={"ghost"} size={"md"} />
              </Dialog.Close>
            </header>

            {/*Moda Content*/}
            <div className={"p-6 border-solid border-gray-200 border-y-[1px]"}>{content || "Modal Content"}</div>

            {/*Moda Footer*/}
            <footer className={"flex items-center justify-end space-x-[.625rem] p-[.625rem]"}>
              {!closeButton && <Cancel />}
              {closeButton && closeButton}
              {!actionButton && <Action />}
              {actionButton && actionButton}
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const Cancel = (props: DialogCloseProps) => {
  const { className, children, ...rest } = props;

  return (
    <Dialog.Close className={className} {...rest} asChild>
      <Button type={"button"} variant={"secondary"} label={children || "Annuler"} />
    </Dialog.Close>
  );
};

export const Action = (props: DialogCloseProps) => {
  const { className, children, ...rest } = props;

  return (
    <Dialog.Close className={className} {...rest} asChild>
      {children}
      {/* <Button type={"button"} variant={"primary"} label={children || "Confirmer"} /> */}
    </Dialog.Close>
  );
};

export const Trigger = (props: DialogTriggerProps) => {
  return <Dialog.Trigger {...props} />;
};

export const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={""}>
      <Modal title={"Modal title"}>
        <Trigger>
          <Button label={"Open modal"} type={"button"} />
        </Trigger>

        <div className={""}>
          <p>Content</p>
          <Button type={"button"} label={"Submit"} />
        </div>

        <Cancel>Annuler</Cancel>
        <Action onClick={() => console.log("Modal action button clicked")}>Valider</Action>
      </Modal>
    </div>
  );
};
