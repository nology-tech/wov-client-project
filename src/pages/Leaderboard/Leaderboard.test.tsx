import { screen } from "@testing-library/react";
import Leaderboard from "./Leaderboard";
import { customRender } from "../../utils/testUtils";
import { UserProfile } from "../../types/User";
import { FirestoreContextProps } from "../../context/FirestoreProvider/FirestoreProvider";

describe("should pass the leaderboard tests", () => {
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
  const mockFireStore = {
    getLeaderboard: (_: string) => Promise.resolve(mockUsers),
  } as FirestoreContextProps;

  it("should render leaderboard with default props", async () => {
    customRender(<Leaderboard />, {useRouting: true, firestoreValue: mockFireStore});
    const cardUser = await screen.findByText("Test User");
    expect(cardUser).toBeInTheDocument();
  });

  it("should sort users by score from highest to lowest", async () => {
    customRender(<Leaderboard />, {useRouting: true, firestoreValue: mockFireStore});
    const sortUsersByScore = (await screen.findAllByTestId(
      "leaderboard__score"
    )) as HTMLParagraphElement[];
    const sortedScores = ["600", "450", "350", "300", "200"];
    for (let i = 0; i < mockUsers.length; i++) {
      expect(sortUsersByScore[i].textContent === sortedScores[i]);
    }
  });
});
