import { mockBook } from "@/app/test/mock/bookMockData";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as subjectActions from "../../actions/subjectActions";
import SubjectsSection from "../SubjectsSection";
describe("SubjectsSection", () => {
    it("renders with error", async () => {
        vi.spyOn(subjectActions, "getSubjects").mockResolvedValueOnce({
            error: {
                message: "Error",
            },
        });
        const subjectSection = await SubjectsSection();
        render(subjectSection);
        expect(screen.getByText("Error")).toBeDefined();
    });
    it("renders the subjects section", async () => {
        vi.spyOn(subjectActions, "getSubjects").mockResolvedValueOnce({
            subjects: mockBook.subjects as any,
        });
        const subjectSection = await SubjectsSection();
        render(subjectSection);
        expect(screen.getByText("Mock Subject")).toBeDefined();
    });
});
