import { fireEvent, render, screen } from "@testing-library/react";
import CreateTask from "./CreateTask";

describe("Create Task Component", () => {
    it ("should render the Create Task Component", async () => {
        render(<CreateTask buttonLabel="Create"/>)

        const name = screen.getByText("Name")
        const date = screen.getByText("Date")
        const category = screen.getByText("Category")
        const description = screen.getByText("Description")
        const points = screen.getByText("Points")

        expect(name).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(points).toBeInTheDocument();
    })

})