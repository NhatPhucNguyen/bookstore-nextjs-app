"use client";
import { BOOK_TITLE_MAX_LENGTH } from "@/app/components/BookCard/BookCard";
import BookCardImage from "@/app/components/BookCard/BookCardImage";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { removeCartItem, updateCartItemQuantity } from "./actions";
import { useToastContext } from "@/app/context/ToastContext";
import Link from "next/link";
type BookCartItem = {
    book: {
        imageUrl: string | null;
        isbn: string;
        title: string;
        price: number;
        discount: number;
        quantity: number;
    };
    quantity: number;
    id: number;
};
const TAX = 0.13;
const calculateTotal = (cartItems: BookCartItem[]) => {
    const subTotal = cartItems.reduce((total, item) => {
        const finalPrice =
            item.book.discount > 0
                ? (item.book.price * (100 - item.book.discount)) / 100
                : item.book.price;
        return total + finalPrice * item.quantity;
    }, 0);
    const tax = subTotal * TAX;
    const finalTotal = subTotal + tax;
    return { subTotal, finalTotal, tax };
};
const Cart = ({ cartItems }: { cartItems: BookCartItem[] }) => {
    const { finalTotal, subTotal, tax } = calculateTotal(cartItems);
    return (
        <div className="mt-5 px-1 md:grid grid-cols-2 place-content-start gap-2">
            <section className="w-full">
                {cartItems?.map((item) => {
                    return <CartItems cartItem={item} key={item.id} />;
                })}
            </section>
            <section className="bg-cart-bg h-fit bg-cover bg-center bg-blend-color-dodge mt-10 md:mt-2">
                <div className="h-full w-full bg-gray-200 bg-opacity-90 grid grid-cols-2 px-1 py-5 min-h-64">
                    <div className="px-2">
                        <h3 className="text-black text-xl font-bold">
                            Shopping Summary
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Please review your items before proceeding to
                            checkout.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Subtotal</span>
                            <span className="font-bold">
                                ${subTotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Tax</span>
                            <span className="font-bold">${tax.toFixed(2)}</span>
                        </div>
                        <hr className="border border-secondary mb-2" />
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Total</span>
                            <span className="font-bold">
                                ${finalTotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="w-full text-center mt-auto">
                            <button className="block mx-auto bg-secondary w-full rounded-md py-1 mb-2 hover:bg-white hover:text-secondary font-bold">
                                Checkout
                            </button>
                            <Link
                                href={"/books"}
                                className="text-sm text-center text-secondary hover:underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

function CartItems({ cartItem }: { cartItem: BookCartItem }) {
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
        <div className="flex flex-row gap-2 mt-2 text-black bg-white round-md p-1">
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
                <div className="flex flex-row">
                    <button
                        className="w-5 bg-gray-300 text-secondary border-none rounded-l-md disabled:opacity-50"
                        onClick={async () => {
                            if (itemQuantity > 1) {
                                const { error } = await updateCartItemQuantity(
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
                                const { error } = await updateCartItemQuantity(
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
                <div className="flex justify-between mt-auto items-center">
                    <div className="font-bold">
                        Total: ${(finalPrice * itemQuantity).toFixed(2)}
                    </div>
                    <IconButton size={"small"} className="hover:text-red-600" onClick={async ()=>{
                        const {error} = await removeCartItem(cartItem.id);
                        if(error){
                            return toastError(error.message);
                        }
                    }}>
                        <FaTrash />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Cart;
