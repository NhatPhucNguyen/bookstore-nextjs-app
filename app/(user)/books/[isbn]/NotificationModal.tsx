"use client";
import { Backdrop } from "@mui/material";
import React, { useRef, MouseEvent } from "react";

const NotificationModal = ({ handleClose }: { handleClose: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <Backdrop
            open={true}
            className="z-50"
            ref={ref}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
                if (e.target === ref.current) {
                    handleClose();
                }
            }}
        >
            <div className="bg-gray-400 bg-opacity-90 px-3 py-10 rounded-2xl">
                <h2 className="text-center text-2xl font-bold text-black">
                    Your book was added !
                </h2>
                <button className="block mx-auto w-60 bg-secondary py-2 rounded-3xl font-bold my-2 hover:bg-white hover:text-secondary">
                    View your cart
                </button>
                <button
                    className="block mx-auto w-60 text-black py-2 rounded-3xl font-bold my-2 bg-white"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        </Backdrop>
    );
};

export default NotificationModal;
