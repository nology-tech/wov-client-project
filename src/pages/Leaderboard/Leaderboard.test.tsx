import { screen } from "@testing-library/react";
import Leaderboard from "./Leaderboard";
import { customRender } from "../../utils/testUtils";

describe("should pass the leaderboard tests", () => {
  it("should render leaderboard with default props", () => {
    const mockUser = {
      id: 1,
      img: "user-image-url",
      score: 100,
      name: "Test User",
      bio: "Test Bio",
      email: "TestEmail@example.com",
      password: "123456"
    };
    customRender(<Leaderboard users={[mockUser]} />);
    const cardUser = screen.getByText("Test User");
    expect(cardUser).toBeInTheDocument();
  });

  it("should sort users by score from highest to lowest", () => {
    const mockUsers = [
      {
        id: 1,
        img: "user-image-url",
        score: 100,
        name: "Test User",
        bio: "Test Bio",
        email: "TestEmail@example.com",
        password: "123456",

      },
      {
        id: 2,
        img: "user-image-url",
        score: 200,
        name: "Test User2",
        bio: "Test Bio",
        email: "TestEmail@example.com",
        password: "123456",

      }
    ];
    customRender(<Leaderboard users={mockUsers} />);
    const sortUsersByScore = screen.getAllByTestId("leaderboard__score") as HTMLParagraphElement[]
    console.log("printing", sortUsersByScore[0].textContent)
    expect(sortUsersByScore)

  });
})

//add test id
// queryAllBy
// gives back array; loops through annd ensure order is correct
