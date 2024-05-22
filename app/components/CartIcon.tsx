"use client";
import { Badge } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { useCartContext } from "../context/CartContext";
import Link from "next/link";
const CartIcon = () => {
    const { cartItems } = useCartContext();
    return (
        <Link href={'/cart'} className="hover:cursor-pointer hover:text-secondary">
            <Badge
                badgeContent={cartItems ? cartItems.length : 0}
                color="success"
            >
                <FaCartShopping className="text-xl" />
            </Badge>
        </Link>
    );
};

export default CartIcon;
