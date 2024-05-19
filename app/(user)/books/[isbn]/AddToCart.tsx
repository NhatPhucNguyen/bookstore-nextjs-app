"use client";
import { useToastContext } from "@/app/context/ToastContext";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { addToCart } from "./actions";
import { useParams } from "next/navigation";
const AddToCart = ({ maxQuantity }: { maxQuantity: number }) => {
    const [value, setValue] = React.useState(1);
    const {isbn} = useParams() as {isbn:string};
    const {toastError} = useToastContext();
    return (
        <div className="w-full mt-2">
            <div className="mx-auto w-fit md:mx-0">
                <button
                    className="w-10 h-10 bg-white text-secondary rounded-l-md disabled:opacity-50"
                    onClick={() => {
                        if (value > 1) setValue(value - 1);
                    }}
                    disabled={value === 1}
                >
                    -
                </button>
                <input
                    type="text"
                    className="w-10 h-10 bg-white text-secondary text-center outline-none border-none"
                    value={value}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            parseInt(e.target.value) < 1
                        ) {
                            setValue(1);
                        } else {
                            const quantity = parseInt(e.target.value) || 1;
                            setValue(
                                quantity > maxQuantity ? maxQuantity : quantity
                            );
                        }
                    }}
                />
                <button
                    className="w-10 h-10 bg-white text-secondary rounded-r-md disabled:opacity-50"
                    onClick={() => {
                        if (value < maxQuantity) setValue(value + 1);
                    }}
                    disabled={value === maxQuantity}
                >
                    +
                </button>
                <button className="ml-2 bg-purple-950 h-10 w-30 px-3 rounded-lg hover:bg-white hover:text-black" onClick={async ()=>{
                    const {error} = await addToCart(isbn, value);
                    if (error) {
                        toastError(error.message);
                    }
                }}>
                    <FaCartShopping className="inline text-inherit "/>
                    <span className="pl-2">Add to cart</span>
                </button>
            </div>
        </div>
    );
};

export default AddToCart;
