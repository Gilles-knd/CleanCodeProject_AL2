import React from "react";
import classNames from "classnames";
import { Button } from "@ui/atoms/Button/Button";
import { ArrowLeftIcon } from "lucide-react";

interface BackButtonProps extends React.ComponentProps<"button"> {
  label?: string
}

export function BackButton(props: BackButtonProps) {
  const { children, className, label, ...rest } = props;
  const cn = classNames(className);

  function back() {
    history.back();
  }

  return (
    <Button
      icon={<ArrowLeftIcon />}
      position={"left"}
      label={label || "Back"}
      variant={"secondary"}
      onClick={back}
      className={cn}
    />
  );
}
