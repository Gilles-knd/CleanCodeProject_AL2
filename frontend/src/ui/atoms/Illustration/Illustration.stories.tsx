import type { Meta, StoryObj } from "@storybook/react";
import { Illustration } from "./Illustration";

const meta = {
  title: "Illustration",
  component: Illustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Illustration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Empty",
  },
};
