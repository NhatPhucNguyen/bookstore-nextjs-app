import { mockBook } from "@/app/test/mock/bookMockData";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as bookActions from "../../actions/bookActions";
import BestSellersSection from "../BestSellersSection";
afterEach(() => {
    vi.clearAllMocks();
});
describe("BestSellersSection", () => {
    it("renders the error message", async () => {
        vi.spyOn(bookActions, "getAllBooks").mockResolvedValueOnce({
            error: {
                message: "Error",
            },
        });
        const container = await BestSellersSection();
        render(container);
        expect(screen.getByText("Error")).toBeDefined();
    });
    it("renders the best sellers section", async () => {
        vi.spyOn(bookActions, "getAllBooks").mockResolvedValueOnce({
            books: [mockBook as any],
        });
        const container = await BestSellersSection();
        render(container);
    });
});
