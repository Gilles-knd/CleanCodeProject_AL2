import { Stack } from "@/ui/layouts/Stack/Stack";
import { ProgressBar } from "@/ui/molecules/ProgressBar/ProgressBar";
import { Text } from "@/ui/atoms/Text/Text";

interface QuizzProgressProps {
  progress: number;
  text: string;
}

export function QuizzProgress(props: QuizzProgressProps) {
  const { progress, text } = props;
  return (
    <Stack direction={"row"} align={"center"} gapy={24} gapx={8}>
      <Text className="!text-sm font-medium">Progression</Text>
      <ProgressBar progress={progress} />
      <Text className="!text-sm font-medium !w-8 flex-none">{text}</Text>
    </Stack>
  );
}
