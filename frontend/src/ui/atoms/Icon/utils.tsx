import React, { ReactElement, ReactNode } from "react";

export interface SvgProps extends React.ComponentProps<"svg"> {
  size?: number;
}

export function SvgContainer(props: any) {
  const { size, children, ...rest } = props;

  const svg = React.cloneElement<HTMLOrSVGElement>(children, {
    width: size || 20,
    height: size || 20,
    ...rest,
  });

  return <>{svg}</>;
}

interface SvgIconProps<T> extends React.ComponentProps<"svg"> {
  size?: number;
  type: T;
}

export interface IconListProps {
  name: string;
  component: ReactElement;
}

export function IconComponentGenerator<T>(list: IconListProps[]): (props: SvgIconProps<T>) => ReactNode {
  return (props: SvgIconProps<T>) => {
    const { type, ...rest } = props;
    const icon = list.find((i) => i.name === type)?.component;
    return React.cloneElement(icon as ReactElement, {
      ...rest,
    });
  };
}
