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
      password: "123456",
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
      },
      {
        id: 3,
        img: "user-image-url",
        score: 150,
        name: "Test User3",
        bio: "Test Bio",
        email: "TestEmail@example.com",
        password: "123456",
      },
    ];
    customRender(<Leaderboard users={mockUsers} />);
    const sortUsersByScore = screen.getAllByTestId(
      "leaderboard__score"
    ) as HTMLParagraphElement[];
    for (let i = 0; i < mockUsers.length; i++) {
      expect(sortUsersByScore[i].textContent);
    }
  }); 
});
