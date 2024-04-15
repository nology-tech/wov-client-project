import { screen } from "@testing-library/react";
import  Leaderboard from "./Leaderboard";
import { customRender } from "../../utils/testUtils";
import { UserProfile } from "../../tempname/mockTribe";

describe("should pass the leaderboard tests", () => {
  it("should render leaderboard with default props", () => {
    const mockUser: UserProfile = {
      id: "1",
      img: "user-image-url",
      totalScore: 100,
      name: "Test User",
      bio: "Test Bio",
      email: "TestEmail@example.com",
    };
    customRender(<Leaderboard users={[mockUser]} />);
    const cardUser = screen.getByText("Test User");
    expect(cardUser).toBeInTheDocument();
  });

  it("should sort users by score from highest to lowest", () => {
    const mockUsers: UserProfile[] = [
      {
        id: "1",
        img: "user-image-url",
        totalScore: 100,
        name: "Test User",
        bio: "Test Bio",
        email: "TestEmail@example.com",
      },
      {
        id: "2",
        img: "user-image-url",
        totalScore: 200,
        name: "Test User2",
        bio: "Test Bio",
        email: "TestEmail@example.com",
      },
      {
        id: "3",
        img: "user-image-url",
        totalScore: 150,
        name: "Test User3",
        bio: "Test Bio",
        email: "TestEmail@example.com",
      },
    ];
    customRender(<Leaderboard users={mockUsers} />);
    const sortUsersByScore = screen.getAllByTestId(
      "leaderboard__score"
    ) as HTMLParagraphElement[];
    const sortedScores = ["600", "450", "350", "300", "200"];
    for (let i = 0; i < mockUsers.length; i++) {
      expect(sortUsersByScore[i].textContent === sortedScores[i]);
    }
  });
});
