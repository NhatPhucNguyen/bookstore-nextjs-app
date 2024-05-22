import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import CartProvider from "../../context/CartContext";
import CartIcon from "../CartIcon";
test("renders CartIcon component", () => {
    render(
        <CartProvider>
            <CartIcon />
        </CartProvider>
    );
    // Assert that the CartIcon component is rendered
    const cartIconElement = screen.getByRole("link");
    expect(cartIconElement).toBeDefined();
    expect(cartIconElement.getAttribute("href")).toEqual("/cart");
    expect(cartIconElement.getAttribute("badgeContent")).toBeDefined();
});
