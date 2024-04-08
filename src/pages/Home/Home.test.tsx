import { screen } from "@testing-library/react";
import Home from "./Home";

import { customRender } from "../../utils/testUtils";

it("should render the form", () => {
  customRender(<Home />);

  const heading = screen.getByRole("heading", {
    name: /page heading/i,
  });

  expect(heading).toBeInTheDocument();
});
