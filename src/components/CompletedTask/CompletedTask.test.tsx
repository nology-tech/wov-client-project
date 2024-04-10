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
      points={10}
      description={"Run as fast as you can"}
      image={
        "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg"
      }
    />
  );
  const taskMedia = screen.queryByText("Media");
  const desc = screen.queryByText("Run as fast as you can");
  const img = screen.queryByAltText("Run 5k");
  expect(taskMedia).not.toBeInTheDocument();
  expect(desc).not.toBeInTheDocument();
  expect(img).not.toBeInTheDocument();
});

it("should display the media when the arrow icon is clicked", async () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={10}
      description={"Run as fast as you can"}
      image={""}
    />
  );
  const arrowIcon = await screen.findByTestId("ExpandMoreIcon");
  userEvent.click(arrowIcon);
  expect(await screen.findByText(/Media/i)).toBeInTheDocument();
});
