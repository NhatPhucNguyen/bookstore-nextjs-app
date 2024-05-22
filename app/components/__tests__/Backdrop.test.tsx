import { describe, it, vi, expect } from "vitest";
import Backdrop from "../Backdrop";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Backdrop", () => {
    it("should call handleClose when clicked", () => {
        const handleClose = vi.fn();
        render(<Backdrop handleClose={handleClose} />);

        fireEvent.click(screen.getByRole("generic", { name: "backdrop" }));

        expect(handleClose).toHaveBeenCalled();
    });

    it("should render children", () => {
        render(
            <Backdrop handleClose={vi.fn()}>
                <div data-testid="child">Child Component</div>
            </Backdrop>
        );

        expect(screen.getByTestId("child")).toBeDefined();
    });

    it("should apply custom className", () => {
        render(<Backdrop handleClose={vi.fn()} className="custom-class" />);

        expect(
            screen
                .getByRole("generic", {
                    name: "backdrop",
                })
                .getAttribute("class")
        ).toContain("custom-class");
    });
});
