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
    const mockUser = {
        id: 1,
        img: "user-image-url",
        score: 100,
        name: "Test User",
        bio: "Test Bio",
        email: "TestEmail@example.com",
        password: "123456",
        
      };
      customRender(<Leaderboard users={[mockUser]} />);
      const sortUsersByScore = screen.queryAllByTestId(mockUser.score);
      expect(sortUsersByScore)
  })
});

//add test id
// queryAllBy
// gives back array; loops through annd ensure order is correct
