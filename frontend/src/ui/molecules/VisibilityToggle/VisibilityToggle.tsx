import classNames from "classnames";

interface VisibilityToggleProps {
  visible: boolean;
  className?: string;
  children: React.ReactNode;
}

export function VisibilityToggle(props: VisibilityToggleProps) {
  const { children, visible, className, ...rest } = props;
  return <>{visible && children}</>;
}
