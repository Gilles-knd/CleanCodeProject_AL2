interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const style = {
    width: `${props.progress}%`,
    maxWidth: "100%",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div className="flex flex-col items-start bg-gray-200 rounded-full h-2 w-full min-w-36">
      <div
        className="inline-block bg-zinc-900 h-full rounded-full"
        style={style}
      />
    </div>
  );
}
