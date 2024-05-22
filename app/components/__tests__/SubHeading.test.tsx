import { render } from "@testing-library/react";
import SubHeading from "../SubHeading";
import { describe, expect, it } from "vitest";

describe("SubHeading", () => {
    it("renders without error", () => {
        render(<SubHeading current="Subheading" />);
    });

    it("displays the current subheading", () => {
        const { getByText } = render(<SubHeading current="Subheading" />);
        expect(getByText("Subheading")).toBeDefined();
    });

    it("displays the parent breadcrumbs", () => {
        const parent = [{ name: "Home", href: "/" }, { name: "Category", href: "/category" }];
        const { getByText } = render(<SubHeading parent={parent} current="Subheading" />);
        expect(getByText("Home")).toBeDefined();
        expect(getByText("Category")).toBeDefined();
    });
});