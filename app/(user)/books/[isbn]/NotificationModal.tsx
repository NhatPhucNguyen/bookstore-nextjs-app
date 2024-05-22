"use client";
import { Backdrop } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useRef, MouseEvent, use, useEffect } from "react";

const NotificationModal = ({ handleClose }: { handleClose: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
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
            <div className="bg-gray-400 bg-opacity-90 px-3 py-10 rounded-2xl min-w-fit md:w-96">
                <h2 className="text-center text-2xl font-bold text-black">
                    Your book was added !
                </h2>
                <button
                    className="block mx-auto w-60 bg-secondary py-2 rounded-3xl font-bold my-2 hover:bg-white hover:text-secondary"
                    onClick={() => {
                        router.push("/cart");
                    }}
                >
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
