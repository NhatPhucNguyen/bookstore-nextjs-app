"use client";
import { CartItem } from "@prisma/client";
import React, { ReactNode } from "react";
import { createContext } from "react";
import useSwr from "swr";
import axios from "axios";
type CartContextType = {
    cartItems: CartItem[] | undefined;
    loading: boolean;
    error: Error | null;
};
const CartContext = createContext<CartContextType | null>(null);

const getCartItemsNumber = async (url: string) => {
    const res = await axios.get(url);
    if (res.data) {
        return res.data as { cartItems: CartItem[] };
    }
    throw new Error("Failed to fetch cart items");
};
const CartProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, error } = useSwr("/api/cart", getCartItemsNumber);
    return (
        <CartContext.Provider
            value={{ cartItems: data?.cartItems, loading: isLoading, error }}
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
