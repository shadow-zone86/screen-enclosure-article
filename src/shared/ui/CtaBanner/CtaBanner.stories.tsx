import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtaBanner } from "./CtaBanner";

const meta = {
  title: "shared/ui/CtaBanner",
  component: CtaBanner,
  parameters: { layout: "fullscreen" },
  args: {
    title: "Get a Free Estimate With an On-Site Measurement",
    text: "Ready to see real numbers for your yard? Request a free estimate with an on-site measurement and a 3D visualization.",
  },
} satisfies Meta<typeof CtaBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { label: "Book the measurement" },
};
