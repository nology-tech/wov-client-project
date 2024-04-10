import { screen, render } from "@testing-library/react";
import HeaderHome from "./HeaderHome";

describe("should pass HeaderHome component tests", () => {
    it("should render image", () => {
        render(<HeaderHome image={"Test Image"} />);
        const headerHomeImage = screen.getByRole("img");
        expect(headerHomeImage).toBeInTheDocument();
    });
    it("should render date", () => {
        render(<HeaderHome image={"Test Image"} date={"10 April 2024"} />);
        const headerHomeDate = screen.getByText(/10 April 2024/i); 
        expect(headerHomeDate).toBeInTheDocument();
    });
    it("should render location", () => {
        render(<HeaderHome image={"Test Image"} location={"Malvern Hills"} />);
        const headerHomeLocation = screen.getByText(/Malvern Hills/i);
        expect(headerHomeLocation).toBeInTheDocument();
    })
}) 