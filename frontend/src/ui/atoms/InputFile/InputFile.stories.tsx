import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";

const meta = {
  title: "InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};