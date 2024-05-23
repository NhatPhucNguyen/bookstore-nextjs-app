import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, test, vi } from "vitest";
import Navbar from "../Navbar";
import CartProvider from "@/app/context/CartContext";
module.exports = {};
afterAll(() => {
    vi.clearAllMocks();
});
describe("Navbar", () => {
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
    test("renders without errors", () => {
        render(
            <CartProvider>
                <Navbar />
            </CartProvider>
        );
        // Assert that the Navbar component renders without throwing any errors
    });

    test("closes dropdown when mobile nav link is clicked", () => {
        render(
            <CartProvider>
                <Navbar />
            </CartProvider>
        );
        // Simulate a click on the mobile nav link
        const mobileNavLink = screen.getByRole("button", {
            name: "mobile-menu",
        });
        fireEvent.click(mobileNavLink);
        // Assert that the dropdown is closed
        const dropdown = screen.getByRole("generic", {
            name: "mobile-dropdown",
        });
        expect(dropdown.getAttribute("class")).toContain("hidden");
    });
    test("renders simple Navbar", () => {
        render(
            <CartProvider>
                <Navbar simple />
            </CartProvider>
        );
        // Assert that the simple Navbar variant is rendered
        const simpleNavbar = screen.getAllByRole("link");
        simpleNavbar.forEach((link) => {
            expect(
                ["home", "create account"].includes(
                    link.textContent?.toLowerCase() as string
                )
            ).toBeTruthy();
        });
    });

    test("renders authenticated Navbar", () => {
        render(
            <CartProvider>
                <Navbar isAuthenticated />
            </CartProvider>
        );
        // Assert that the authenticated Navbar variant is rendered
        expect(screen.getAllByText("Logout")).toBeDefined();
    });

    test("renders payment layout Navbar", () => {
        render(
            <CartProvider>
                <Navbar simple paymentLayout isAuthenticated/>
            </CartProvider>
        );
        // Assert that the payment layout Navbar variant is rendered
        const paymentNavbar = screen.getAllByRole("link");
        expect(
            paymentNavbar.forEach((link) => {
                console.log(link.textContent);
                expect(
                    ["home", "books", "logout"].includes(
                        link.textContent?.toLowerCase() as string
                    )
                ).toBeTruthy();
            })
        );
    });
});
