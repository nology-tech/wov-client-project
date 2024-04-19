import { screen, render } from "@testing-library/react";
import LeaderboardCard from "./LeaderboardCard";

describe("should pass the LeaderboardCard tests", () => {
  it("should render leaderboard card with default props", () => {
    render(
      <LeaderboardCard
        name={"Test Name"}
        profileImage={"Test Image"}
        totalScore={100}
        isFirstCard={true}
        currentUserID=""
        userID=""
      />
    );
    const cardName = screen.getByText(/Test Name/i);
    const cardImage = screen.getByRole("img");
    const cardScore = screen.getByText(/100/);

    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardScore).toBeInTheDocument();
  });

  it("should not render the name if it is incorrectly capitalized", () => {
    render(
      <LeaderboardCard
        name={"Test Name"}
        profileImage={"Test Image"}
        totalScore={100}
        isFirstCard={true}
        currentUserID=""
        userID=""
      />
    );
    const incorrectlyCapitalizedName = screen.queryByText("test Name");
    expect(incorrectlyCapitalizedName).toBeNull();
  });

  it("should return a name correctly capitalised", () => {
    render(
      <LeaderboardCard
        name={"Test Name"}
        profileImage={"Test Image"}
        totalScore={100}
        isFirstCard={true}
        currentUserID=""
        userID=""
      />
    );
    const capitalName = screen.getByText("Test Name");
    expect(capitalName).toBeTruthy();
  });

  it("should apply 'leaderboard-card--first' class to the first card", () => {
    render(
      <LeaderboardCard
        name={"Test Name"}
        profileImage={"Test Image"}
        totalScore={100}
        isFirstCard={true}
        currentUserID=""
        userID=""
      />
    );
    const leaderboardCard = screen.getByTestId("leaderboard-card");
    expect(leaderboardCard).toHaveClass("leaderboard-card--first");
  });

  it("should apply 'leaderboard-card--current-user' class to the current user card", () => {
    render(
      <LeaderboardCard
        name={"Test Name"}
        profileImage={"Test Image"}
        totalScore={100}
        isFirstCard={false}
        currentUserID="currentUserId123"
        userID="currentUserId123"
      />
    );
    const leaderboardCard = screen.getByTestId("leaderboard-card");
    expect(leaderboardCard).toHaveClass("leaderboard-card--current-user");
  });
});
