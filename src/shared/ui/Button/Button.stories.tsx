import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "shared/ui/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    children: "Request a free estimate",
    variant: "primary",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Free estimate" },
};

export const AsLink: Story = {
  args: { href: "/free-estimate" },
};
