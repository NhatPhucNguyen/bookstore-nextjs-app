import React from "react";
import { render, screen } from "@testing-library/react";
import FormController from "../FormController";
import { describe, expect, it } from "vitest";

describe("FormController", () => {
    it("renders children without error", () => {
        const { getByText } = render(
            <FormController>
                <div>Child Component</div>
            </FormController>
        );

        expect(getByText("Child Component")).toBeDefined();
    });

    it("applies className prop correctly", () => {
        render(
            <FormController className="custom-class">
                <div>Child Component</div>
            </FormController>
        );

        expect(
            screen
                .getByText("Child Component")
                .parentElement?.getAttribute("class")
        ).toContain("custom-class");
    });

    it("displays error message correctly", () => {
        const error = { message: "Field is required" };

        const { getByText } = render(
            <FormController error={error}>
                <div>Child Component</div>
            </FormController>
        );

        expect(getByText("Field is required")).toBeDefined();
    });
});
