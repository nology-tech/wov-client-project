import { screen } from "@testing-library/react";
import Header from "./Header";
import { customRender } from "../../utils/testUtils";

describe("should pass Header component tests", () => {
  it("should render title", () => {
    customRender(<Header title={"Test Title"} />);
    const headerTitle = screen.getByText("Test Title");
    expect(headerTitle).toBeInTheDocument();
  });
});
