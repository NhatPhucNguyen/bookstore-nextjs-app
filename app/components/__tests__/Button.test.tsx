import { render, fireEvent, cleanup } from "@testing-library/react";
import Button from "../Button";
import { describe, expect, test, vi, afterEach } from "vitest";
afterEach(() => {
    cleanup();
});
describe("Button Component", () => {
    test("renders children correctly", () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText("Click me")).toBeDefined();
    });

    test("calls onClick handler when clicked", () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>Click me</Button>
        );
        fireEvent.click(getByText("Click me"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("has the correct type attribute", () => {
        const { getByText } = render(<Button type="submit">Submit</Button>);
        expect(getByText("Submit").getAttribute("type")).toEqual("submit");
    });

    test("applies the correct className", () => {
        const { getByText } = render(
            <Button className="custom-button">Custom Button</Button>
        );
        expect(getByText("Custom Button").getAttribute("class")).toContain(
            "custom-button"
        );
    });
});
