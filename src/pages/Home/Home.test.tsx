import { screen } from "@testing-library/react";
import Home from "./Home";

import { customRender } from "../../utils/testUtils";

describe("Navigation component", () => {
  it("should render the home page", () => {
    customRender(<Home />);
  });

  it("should render the button"),
    () => {
      customRender(<Home />);
      const homeButton = screen.getByText("VIEW TODAY's TASKS");
      expect(homeButton).toBeInTheDocument();
    };

  it("shoulld render the paragraph"),
    () => {
      customRender(<Home />);
      const paragraph = screen
        .getByTestId("container")
        .querySelector("paragraph");
      expect([paragraph]).toBeInTheDocument;
    };
});
