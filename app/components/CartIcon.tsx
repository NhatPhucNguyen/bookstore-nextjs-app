"use client";
import { Badge } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { useCartContext } from "../context/CartContext";
const CartIcon = () => {
    const { cartItems } = useCartContext();
    return (
        <Badge badgeContent={cartItems ? cartItems.length : 0} color="success">
            <FaCartShopping className="text-xl" />
        </Badge>
    );
};

export default CartIcon;
