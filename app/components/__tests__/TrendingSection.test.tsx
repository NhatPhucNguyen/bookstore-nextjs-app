import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TrendingSection from "../TrendingSection";
import * as bookActions from "../../actions/bookActions";
import { mockBook } from "@/app/test/mock/bookMockData";
beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});
describe("TrendingSection", () => {
    it("renders without errors", async () => {
        vi.spyOn(bookActions, "getAllBooks").mockResolvedValueOnce({
            books: [mockBook as any],
        });
        const trendingSection = await TrendingSection();
        render(trendingSection);
        expect(screen.getByText(mockBook.title)).toBeDefined();
    });
    it("renders with error", async () => {
        vi.spyOn(bookActions, "getAllBooks").mockResolvedValueOnce({
            error: {
                message: "Error",
            },
        });
        const trendingSection = await TrendingSection();
        render(trendingSection);
        expect(screen.getByText("Error")).toBeDefined();
    });
});
