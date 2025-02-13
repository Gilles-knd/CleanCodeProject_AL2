import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, ButtonProps } from "@ui/atoms/Button/Button";
import { ReactElement, ReactNode } from "react";
import { DialogCloseProps, DialogProps, DialogTriggerProps } from "@radix-ui/react-dialog";
import { ButtonIcon } from "@ui/atoms/ButtonIcon/ButtonIcon";
import { XIcon } from "lucide-react";
import { Overlay } from "@ui/atoms/Overlay/Overlay";
import { ScrollView } from "@ui/layouts/ScrollView/ScrollView";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface DrawerProps extends DialogProps {
  title: string;
}

export function Root(props: DrawerProps) {
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
        <Dialog.Description>Drawer content</Dialog.Description>
        <Dialog.Content
          className={"fixed left-0 top-0 bottom-0 right-0 z-10 flex flex-col p-8 items-end justify-center"}>
          <div
            className={
              "w-full max-w-[30rem] flex flex-col h-full border-solid border-[1px] border-gray-200 bg-white z-10 rounded-2xl shadow-modal"
            }>
            <VisuallyHidden>
              <Dialog.Title></Dialog.Title>
            </VisuallyHidden>

            {/*Moda Header*/}
            <header className={"h-12 flex items-center justify-between px-4 "}>
              <h3 className={"text-sm font-medium text-gray-800"}>{title}</h3>
              <Dialog.Close asChild>
                <ButtonIcon icon={<XIcon />} variant={"ghost"} size={"md"} />
              </Dialog.Close>
            </header>

            {/*Moda Content*/}
            <ScrollView className={"border-solid h-full border-gray-200 border-y-[1px]"}>
              <div className={"pt-6 px-6"}>{content || "Modal Content"}</div>
            </ScrollView>

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

type DrawerActionProps = DialogCloseProps & {
  children?: ReactElement;
  label?: string;
};

export const Cancel = (props: DrawerActionProps) => {
  const { className, children, label, ...rest } = props;
  const Default = (
    <Dialog.Close className={className} {...rest} asChild>
      <Button type={"button"} variant={"secondary"} label={label || "Cancel"} />
    </Dialog.Close>
  );

  return (
    <>
      {children && <Dialog.Close asChild>{children}</Dialog.Close>}
      {!children && Default}
    </>
  );
};


export const Action = (props: DrawerActionProps) => {
  const { children, label, ...rest } = props;
  const Default = (
    <Dialog.Close>
      <Button variant={"primary"} label={label || "Ok"} {...rest} />
    </Dialog.Close>
  );

  return (
    <>
      {children && children}
      {!children && Default}
    </>
  );
};

export const Trigger = (props: DialogTriggerProps) => {
  return <Dialog.Trigger asChild {...props} />;
};

export const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={""}>
      <Root title={"Drawer title"}>
        <Trigger>
          <Button label={"Open Drawer"} type={"button"} />
        </Trigger>

        <div className={""}>
          <p>Content</p>
          <Button type={"button"} label={"Submit"} />
        </div>

        <Cancel>Annuler</Cancel>
        <Action onClick={() => console.log("Modal action button clicked")}>Valider</Action>
      </Root>
    </div>
  );
};
