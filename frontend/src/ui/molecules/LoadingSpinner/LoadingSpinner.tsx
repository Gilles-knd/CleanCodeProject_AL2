import { Spinner } from "@/ui/atoms/Spinner/Spinner";
import { Stack } from "@/ui/layouts/Stack/Stack";

export function LoadinSpinner(props: React.ComponentProps<'div'>) {
    return (
      <Stack direction={"col"} align={"center"} justify={"center"} className={"p-10 h-10 opacity-25"} {...props}>
        <Spinner size={32} />
      </Stack>
    );
  }