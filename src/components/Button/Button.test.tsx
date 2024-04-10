import { fireEvent, screen } from "@testing-library/react";
import Button from "./Button";
import { customRender } from "../../utils/testUtils";
import { vi } from "vitest";

describe("Button Component", () => {
  it("should render button with default props", () => {
    customRender(<Button label="Click me" />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toHaveClass("button--primary");
  });

  it("should render button with the secondary variant prop", () => {
    customRender(<Button label="Click me" variant="secondary" />);

    expect(screen.getByText("Click me")).toHaveClass("button--secondary");
  });

  it("should render button with the light-grey variant prop", () => {
    customRender(<Button label="Click me" variant="light-grey" />);

    expect(screen.getByText("Click me")).toHaveClass("button--light-grey");
  });

  it("should call onClick handler when button is clicked", () => {
    const onClickMock = vi.fn();
    customRender(<Button label="Click me" onClick={onClickMock} />);

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
