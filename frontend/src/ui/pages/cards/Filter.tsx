"use client";

import { Select } from "@/ui/atoms/Select/Select";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { SelectContent } from "@radix-ui/react-select";
import { ChevronDown, X } from "@icons";
import React, { useEffect } from "react";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";

type FilterKey = {
  label: string;
  key: string;
};

interface FilterProps<T> {
  filters: FilterKey[];
  data: T[];
  className?: string;
  title: string;
  onFilter: CallableFunction;
}

export function Filter<T extends Record<string, any>>(props: FilterProps<T>) {
  const { filters, data, title, onFilter, className } = props;
  const cn = `rounded-2xl bg-zinc-100 p-4 ${className}`;

  const [selectedKeys, setSelectedKeys] = React.useState<
    Record<string, string>
  >({});

  const filteredData: T[] = [];

  /** Extrait les noms et les différentes clés dans les données à filtrer*/
  function getKeys<T>(data: T[], keys: FilterKey[]) {
    let filteringKeysMaps = new Map<string, string[]>();

    keys.forEach((k) => {
      filteringKeysMaps.set(k.key, []);
    });

    data.forEach((d: T) => {
      keys.forEach((k: FilterKey) => {
        if (!filteringKeysMaps.get(k.key)?.includes(d[k.key])) {
          filteringKeysMaps.get(k.key)?.push(d[k.key]);
        }
      });
    });

    return [...filteringKeysMaps];
  }
  const filteringKeys = getKeys(data, filters);

  const filter = (key: string, value: string) => {
    setSelectedKeys((prev) => ({
      ...prev,
      [key]: value, // Remplace la valeur de cette clé
    }));
  };

  useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.entries(selectedKeys).every(
        ([key, value]) => item[key] === value // Vérifie si chaque clé du filtre correspond
      )
    );

    onFilter(filteredData);
  }, [selectedKeys, data, props.onFilter]);

  return (
    <Stack className={cn} direction="col" gapy={8}>
      <h3>{title}</h3>
      <Stack direction={"row"} gapx={8} align="center" className="flex-none">
        {filteringKeys.map(([key, values]) => {
          return (
            <Select.Root key={key} onValueChange={(v) => filter(key, v)}>
              <Select.Trigger
                className="flex flex-row items-center justify-between space-x-4 px-4 py-2 border border-solid bg-white rounded-2xl"
                aria-label={key}
              >
                <Select.Value placeholder={key} className="text-sm" />
                <Select.Icon className="SelectIcon">
                  <ChevronDown size={16} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <SelectContent className="w-full bg-white border border-solid border-gray-200 rounded-2xl p-1">
                  <Select.Viewport className="p-0">
                    {values.map((v) => {
                      return (
                        <Select.Item
                          key={v}
                          value={v}
                          className="py-2 px-4 rounded-xl cursor-pointer outline-none user-select-none text-sm hover:bg-zinc-100"
                        >
                          <Select.ItemText>{v}</Select.ItemText>
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                </SelectContent>
              </Select.Portal>
            </Select.Root>
          );
        })}

        <VisibilityToggle visible={Object.keys(selectedKeys).length > 0}>
          <ButtonIcon
            variant={"secondary"}
            size={"sm"}
            rounded
            icon={<X size={16} />}
            onClick={() => setSelectedKeys({})}
          />
        </VisibilityToggle>
      </Stack>
    </Stack>
  );
}
