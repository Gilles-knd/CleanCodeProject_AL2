import {
  IconComponentGenerator,
  IconListProps,
  SvgContainer,
  SvgProps,
} from "@ui/atoms/Icon/utils";

function Spinner(props: SvgProps) {
  return (
    <SvgContainer {...props}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 4v2.286m5.714 0L16 8M6.286 6.286L8 8m4 12v-2.286m5.714 0L16 16m-9.714 1.714L8 16m-4-4h2.286m11.428 0H20"
          stroke="currentColor"
          strokeWidth={1.71429}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgContainer>
  );
}

type OutlineIconType =
  | "SuitCase"
  | "Calendar"
  | "Dollar"
  | "TimesClock"
  | "Spinner";
const IconList: IconListProps[] = [{ name: "Spinner", component: <Spinner /> }];
export const OutlineIcon = IconComponentGenerator<OutlineIconType>(IconList);
