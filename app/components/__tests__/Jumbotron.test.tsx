import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Jumbotron from "../Jumbotron";
describe("Jumbotron component testing", () => {
    test("Jumbotron component should render key component", async () => {
        render(<Jumbotron />);
        expect(screen
            .getByRole("link", {
                name: "goToCollection",
            })
        ).toBeDefined();
        expect(screen.getByRole("img")).toBeDefined();
        expect(screen.getByRole("heading")).toBeDefined();
        expect(screen.getByRole("paragraph")).toBeDefined();
    });
});
