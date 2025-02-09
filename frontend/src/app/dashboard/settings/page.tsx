"use client";

import { Switch } from "@/ui/atoms/Switch/Switch";
import { Text } from "@/ui/atoms/Text/Text";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { DatePicker } from "@/ui/molecules/DatePicker/DatePicker";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";
import { AppHeader } from "@/ui/organisms/AppHeader/AppHeader";
import React from "react";

export default function SettingsPage() {
  const [time, setTime] = React.useState(new Date());
  const [notification, setNotification] = React.useState(false);

  const preference = [
    {
      title: "Notifications",
      options: [
        {
          label: "Recevoir des notifications de rappel",
          description:
            "Vous recevrez une notification tous les jours à la même heure.",
          inputs: [
            {
              name: "Switch",
              component: (
                <Switch
                  size={"sm"}
                  defaultChecked={notification}
                  onCheckedChange={setNotification}
                />
              ),
            },
            {
              name: "Time",
              component: () => {
                return (
                  <div>
                    (
                    {notification && (
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        selected={time}
                        locale="fr-FR"
                        onChange={(date) => (date ? setTime(date) : null)}
                      />
                    )}
                    )
                  </div>
                );
              },
            },
          ],
        },
      ],
    },
  ];
  return (
    <div>
      <AppHeader title={"Settings"} />
      <Stack className="p-10 flex justify-center" direction="col">
        <Stack direction="col" gapy={8}>
          <Stack direction="col" gapy={4}>
            <Stack
              direction="row"
              gapx={4}
              className="pb-4 border-b border-solid border-gray-200"
            >
              <Text className="font-medium !text-lg text-zinc-900">
                Rappels
              </Text>
            </Stack>

            <Stack direction="col" gapy={4}>
              <Stack
                direction="row"
                justify="space-between"
                align="center"
                gapx={4}
                className="py-6"
              >
                <Stack direction="col" gapy={4}>
                  <Text className="font-medium !text-sm text-zinc-900">
                    Notification
                  </Text>
                  <Text className="text-gray-600 !text-sm">
                    Vous recevrez une notification tous les jours à la même
                    heure.
                  </Text>
                </Stack>

                <Stack direction="col" gapy={4} align="end">
                  <Switch
                    size={"sm"}
                    defaultChecked={notification}
                    onCheckedChange={setNotification}
                  />

                  <div className="h-8">
                    <VisibilityToggle visible={notification}>
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        dateFormat="h:mm"
                        selected={time}
                        onChange={(date) => (date ? setTime(date) : null)}
                      />
                    </VisibilityToggle>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
