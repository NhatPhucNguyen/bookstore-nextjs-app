"use client";
import { CartItem } from "@prisma/client";
import React, { ReactNode } from "react";
import { createContext } from "react";
import useSwr from "swr";
type CartContextType = {
    cartItems: CartItem[] | undefined;
    loading: boolean;
};
const CartContext = createContext<CartContextType | null>(null);

const getCartItemsNumber = async (url: string) => {
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data as { cartItems: CartItem[] };
    }
};
const CartProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useSwr("/api/cart", getCartItemsNumber);
    return (
        <CartContext.Provider
            value={{ cartItems: data?.cartItems, loading: isLoading }}
        >
            {children}
        </CartContext.Provider>
    );
};
export const useCartContext = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
export default CartProvider;
