import { fireEvent, render, screen } from "@testing-library/react";

import CompletedTask from "./CompletedTask";

it("should render the Completed Task component", () => {
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
  const taskHeading = screen.getByText("Run 5k");
  const taskCategory = screen.getByText("Fitness");
  const taskPoints = screen.getByText(/10/);
  expect(taskHeading).toBeInTheDocument();
  expect(taskCategory).toBeInTheDocument();
  expect(taskPoints).toBeInTheDocument();
});

it("shouldn't display the collapsed information on initial render", () => {
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

it("should display the collapsed information when the arrow icon is clicked", async () => {
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
  const arrowIcon = screen.getByTestId("ExpandMoreIcon");
  fireEvent.click(arrowIcon);
  expect(await screen.findByText("Media")).toBeInTheDocument();
  expect(await screen.findByText("Run as fast as you can")).toBeInTheDocument();
  expect(await screen.findByAltText("Run 5k")).toBeInTheDocument();
});

it("shouldn't display the media section when the arrow icon is clicked and there is no image", async () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={10}
      description={"Run as fast as you can"}
    />
  );
  const arrowIcon = screen.getByTestId("ExpandMoreIcon");
  fireEvent.click(arrowIcon);

  expect(await screen.findByText("Run as fast as you can")).toBeInTheDocument();

  const taskMedia = screen.queryByText("Media");
  const img = screen.queryByAltText("Run 5k");
  expect(taskMedia).not.toBeInTheDocument();
  expect(img).not.toBeInTheDocument();
});

it("shouldn't display the collapsed information when the arrow icon is clicked twice", () => {
  render(
    <CompletedTask
      taskHeading={"Run 5k"}
      category={"Fitness"}
      points={10}
      description={"Run as fast as you can"}
      image={"https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg"}
    />
  );
  const arrowIcon = screen.getByTestId("ExpandMoreIcon");
  fireEvent.click(arrowIcon);
  setTimeout(() => {
    fireEvent.click(arrowIcon);
  }, 100);
  setTimeout(() => {
    const taskMedia = screen.queryByText("Media");
    const desc = screen.queryByText("Run as fast as you can");
    const img = screen.queryByAltText("Run 5k");
    expect(taskMedia).not.toBeInTheDocument();
    expect(desc).not.toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  }, 100);
});
