import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CompletedTask from "./CompletedTask";

it("should render the Completed Task component", () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={10}
      description={"Run as fast as you can"}
      image={""}
    />
  );

  const taskHeading = screen.getByText("Run 5k");
  const taskCategory = screen.getByText("Fitness");
  const taskPoints = screen.getByText(/10/);

  expect(taskHeading).toBeInTheDocument();
  expect(taskCategory).toBeInTheDocument();
  expect(taskPoints).toBeInTheDocument();
});

it("shouldn't display the media on initial render", () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={0}
      description={"Run as fast as you can"}
      image={""}
    />
  );
  const taskMedia = screen.queryByText("Media");

  expect(taskMedia).not.toBeInTheDocument();
});

it("should display the media when the arrow icon is clicked", async () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={0}
      description={"Run as fast as you can"}
      image={""}
    />
  );

  const arrowIcon = await screen.findByTestId("ExpandMoreIcon");
  userEvent.click(arrowIcon);

  expect(await screen.findByText(/Media/i)).toBeInTheDocument();
});
