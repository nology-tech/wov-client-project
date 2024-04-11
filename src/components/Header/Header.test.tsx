import { screen } from "@testing-library/react";
import Header from "./Header";
import { customRender } from "../../utils/testUtils";

describe("should pass Header component tests", () => {
  it("should render subtitle", () => {
    customRender(<Header subtitle={"Test Subtitle"} />);
    const headerTitle = screen.getByText("Test Subtitle");
    expect(headerTitle).toBeInTheDocument();
  });
});
