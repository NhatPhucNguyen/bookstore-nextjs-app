import { mainTitle } from "@/app/utils/globalVariables";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
    title: mainTitle + " | Payment Success",
};
const PaymentSuccessPage = () => {
    return (
        <div className="min-h-80 flex items-center justify-center px-1">
            <div className="w-full min-h-40 bg-white px-1 py-5 text-black rounded-md sm:w-1/2">
                <Image
                    src={"/payment-success.png"}
                    alt="payment success image"
                    width={100}
                    height={100}
                    className="mx-auto"
                />
                <h1 className="text-center text-2xl font-bold">
                    Your payment was successful ! 🎉
                </h1>
                <p className="text-center text-lg">
                    Thank you for your purchase
                </p>
                <div className="text-center mt-5">
                    <Link href={"/"} className="text-lg font-bold hover:underline">Return to home</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
