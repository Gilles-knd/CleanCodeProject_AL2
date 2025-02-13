"use client";

import { Spinner } from "@/ui/atoms/Spinner/Spinner";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Text } from "@/ui/atoms/Text/Text";
import { createPortal } from "react-dom";
import React from "react";

export function StepLoader({ steps, open }: { steps: string[]; open: boolean }) {
  let [w, setWindow] = React.useState<any>(null);

  React.useEffect(() => {
    if(window)  {
        setWindow(window)
    }
  }, [])

  return (
    <>
      {w &&
        createPortal(
          <>
            {open && (
              <div
                className={"flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"}>
                <Stack
                  direction={"col"}
                  align="center"
                  justify="center"
                  gapy={16}
                  className="rounded-xl bg-white p-4 w-[14rem]">
                  <Spinner className="flex-none flex-grow-0" />
                  {steps.length === 0 && <Text className="text-gray-500 !text-sm text-center">Loading...</Text>}
                  {steps.length !== 0 && (
                    <Text className="text-gray-500 !text-sm text-center">{steps[steps.length - 1]}</Text>
                  )}
                </Stack>
              </div>
            )}
            {!open && <></>}
          </>,
          w.document.body,
        )}
    </>
  );
}
