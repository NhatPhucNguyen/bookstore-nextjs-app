"use client";
import { BOOK_TITLE_MAX_LENGTH } from "@/app/components/BookCard/BookCard";
import BookCardImage from "@/app/components/BookCard/BookCardImage";
import { useToastContext } from "@/app/context/ToastContext";
import React, { useState } from "react";
import { removeCartItem, updateCartItemQuantity } from "./actions";
import { BookCartItem } from "./Cart";
import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa6";

function CartItem({
    cartItem,
    readOnly,
}: {
    cartItem: BookCartItem;
    readOnly?: boolean;
}) {
    const finalPrice =
        cartItem.book.discount > 0
            ? (cartItem.book.price * (100 - cartItem.book.discount)) / 100
            : cartItem.book.price;
    const [itemQuantity, setItemQuantity] = useState(
        cartItem.quantity > cartItem.book.quantity
            ? cartItem.book.quantity
            : cartItem.quantity
    );
    const { toastError } = useToastContext();
    return (
        <div className={`flex flex-row gap-2 mt-2 text-black bg-white round-md p-1 ${readOnly && "bg-opacity-50"}`}>
            <div className="min-w-fit">
                <BookCardImage
                    imageUrl={cartItem.book.imageUrl}
                    width={120}
                    height={124}
                    className="mx-0"
                />
            </div>
            <div className="text-sm w-full flex flex-col">
                <h4 className="text-gray-500">ISBN {cartItem.book.isbn}</h4>
                <h3 className="font-bold">
                    {cartItem.book.title.length > BOOK_TITLE_MAX_LENGTH
                        ? cartItem.book.title.slice(0, BOOK_TITLE_MAX_LENGTH) +
                          "..."
                        : cartItem.book.title}
                </h3>
                <p className="font-bold">${finalPrice.toFixed(2)}</p>
                {readOnly ? (
                    <p>Quantity: {cartItem.quantity}</p>
                ) : (
                    <div className="flex flex-row">
                        <button
                            className="w-5 bg-gray-300 text-secondary border-none rounded-l-md disabled:opacity-50"
                            onClick={async () => {
                                if (itemQuantity > 1) {
                                    const { error } =
                                        await updateCartItemQuantity(
                                            cartItem.id,
                                            itemQuantity - 1
                                        );
                                    if (error) {
                                        return toastError(error.message);
                                    }
                                    setItemQuantity(itemQuantity - 1);
                                }
                            }}
                            disabled={itemQuantity === 1}
                        >
                            -
                        </button>
                        <span className="w-10 bg-gray-200 text-secondary text-center outline-none border-none">
                            {itemQuantity}
                        </span>
                        <button
                            className="w-5 bg-gray-300 text-secondary border-none rounded-r-md disabled:opacity-50"
                            onClick={async () => {
                                if (itemQuantity < cartItem.book.quantity) {
                                    const { error } =
                                        await updateCartItemQuantity(
                                            cartItem.id,
                                            itemQuantity + 1
                                        );
                                    if (error) {
                                        return toastError(error.message);
                                    }
                                    setItemQuantity(itemQuantity + 1);
                                }
                            }}
                            disabled={itemQuantity === cartItem.book.quantity}
                        >
                            +
                        </button>
                    </div>
                )}
                <div className="flex justify-between mt-auto items-center">
                    <div className="font-bold">
                        Total: ${(finalPrice * itemQuantity).toFixed(2)}
                    </div>
                    {!readOnly && (
                        <IconButton
                            size={"small"}
                            className="hover:text-red-600"
                            onClick={async () => {
                                const { error } = await removeCartItem(
                                    cartItem.id
                                );
                                if (error) {
                                    return toastError(error.message);
                                }
                            }}
                        >
                            <FaTrash />
                        </IconButton>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
