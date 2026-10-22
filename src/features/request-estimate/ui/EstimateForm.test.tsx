import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EstimateForm } from "./EstimateForm";

describe("форма бесплатного замера", () => {
  it("показывает ошибки при отправке пустой формы", () => {
    render(<EstimateForm />);

    fireEvent.click(screen.getByRole("button", { name: "Request my free estimate" }));

    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Phone")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/10-digit phone number/i)).toBeInTheDocument();
  });

  it("подтверждает заявку после заполнения", () => {
    render(<EstimateForm />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Dana Reed" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "(239) 555-0142" } });
    fireEvent.change(screen.getByLabelText("Property address"), {
      target: { value: "1420 Gulf Shore Blvd, Naples" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Request my free estimate" }));

    expect(screen.getByRole("status")).toHaveTextContent("We will call Dana Reed");
  });
});
