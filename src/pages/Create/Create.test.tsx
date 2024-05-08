import Create from "./Create";
import { customRender } from "../../utils/testUtils";
import { screen } from "@testing-library/react";

describe ("Create page", () => {
    it("should render form on load", () => {
        customRender(<Create />)
        const name = screen.getByText(/name/i)
        // const date = screen.getByText(/date/i)
        const category = screen.getByText(/category/i)
        const description = screen.getByText(/description/i)
        const points = screen.getByText(/points/i)
        expect(name).toBeInTheDocument();
        // expect(date).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(points).toBeInTheDocument();
    }) 
})