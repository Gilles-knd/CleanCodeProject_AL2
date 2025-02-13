// @ts-ignore
import { SvgContainer, SvgProps } from "@ui/atoms/Icon/utils";

export * from "lucide-react";

export function LogOutRoundedIcon(props: SvgProps) {
  return (
    <SvgContainer {...props}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M12 3.25a.75.75 0 110 1.5 7.25 7.25 0 000 14.5.75.75 0 110 1.5 8.75 8.75 0 010-17.5z"
          fill="currentColor"
        />
        <path
          d="M16.47 9.53a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H10a.75.75 0 110-1.5h8.19l-1.72-1.72z"
          fill="currentColor"
        />
      </svg>
    </SvgContainer>
  );
}
