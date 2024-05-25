import ToastProvider from "@/app/context/ToastContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import * as cartActions from "../../../../actions/cartActions";
import AddToCart from "../AddToCart";
afterAll(() => {
    vi.clearAllMocks();
});
describe("AddToCart Component", () => {
    vi.mock("server-only", () => {
        return {};
    });
    vi.mock("react", async () => {
        const testCache = <T extends (...args: Array<unknown>) => unknown>(
            func: T
        ) => func;
        const originalModule = await vi.importActual("react");
        return {
            ...originalModule,
            cache: testCache,
        };
    });
    vi.mock("next/navigation", async () => {
        const originalModule = await vi.importActual("next/navigation");
        return {
            ...originalModule,
            useParams: vi.fn().mockReturnValue({ isbn: "123456" }),
            useRouter: vi.fn()
        };
    });
    it("renders without crashing", () => {
        render(
            <ToastProvider>
                <AddToCart maxQuantity={10} />
            </ToastProvider>
        );
    });

    it("displays a loading spinner when addToCart is called", () => {
        render(
            <ToastProvider>
                <AddToCart maxQuantity={10} />
            </ToastProvider>
        );
        const addToCartButton = screen.getByRole("button", {
            name: "add-to-cart-button",
        });

        fireEvent.click(addToCartButton);

        expect(screen.getByRole("progressbar")).toBeDefined();
    });

    it("displays a success notification when addToCart is successful", async () => {
        vi.spyOn(cartActions, "addToCart").mockResolvedValueOnce({
            success: true,
        });
        render(
            <ToastProvider>
                <AddToCart maxQuantity={10} />
            </ToastProvider>
        );
        const addToCartButton = screen.getByRole("button", {
            name: "add-to-cart-button",
        });
        fireEvent.click(addToCartButton);
        await vi.waitFor(()=>{
            expect(screen.getByText("View your cart")).toBeDefined();
            expect(screen.getByText("Continue Shopping")).toBeDefined();
        })
    });
    it("displays a error notification when addToCart is failed", async () => {
        vi.spyOn(cartActions, "addToCart").mockResolvedValueOnce({
            error:{
                message:"Error"
            }
        });
        render(
            <ToastProvider>
                <AddToCart maxQuantity={10} />
            </ToastProvider>
        );
        const addToCartButton = screen.getByRole("button", {
            name: "add-to-cart-button",
        });
        fireEvent.click(addToCartButton);

        await vi.waitFor(()=>{
            expect(screen.getByText("Error")).toBeDefined();
        })
    });
    it("change value when increase and decrease button clicked or text changed", async () => {
        render(
            <ToastProvider>
                <AddToCart maxQuantity={10} />
            </ToastProvider>
        );
        const decrease = screen.getByText("-");
        const increase = screen.getByText("+");
        fireEvent.click(increase);
        expect(screen.getByRole("textbox").getAttribute("value")).toContain("2");
        fireEvent.click(decrease);
        expect(screen.getByRole("textbox").getAttribute("value")).toContain("1");
        fireEvent.change(screen.getByRole("textbox"),{target:{value:"5"}});
        expect(screen.getByRole("textbox").getAttribute("value")).toContain("5");
    });
});
