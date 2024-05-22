import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/session";
import { mainTitle } from "@/app/utils/globalVariables";
import { red } from "@mui/material/colors";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
export const metadata: Metadata = {
    title: mainTitle + " | Payment Success",
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const PaymentSuccessPage = async ({
    searchParams,
}: {
    searchParams: {
        payment_intent: string;
    };
}) => {
    const paymentIntents = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent
    );
    if (!paymentIntents.metadata.cartId) {
        return notFound();
    }
    const user = await getUser();
    if (user === null) return redirect("/login");
    {
        /* Decrease books quantity */
    }
    const cart = await prisma.cart.findUnique({
        where: {
            id: Number(paymentIntents.metadata.cartId),
        },
        include: {
            cartItems: {
                include: {
                    book: true,
                },
            },
        },
    });
    if (!cart) return notFound();
    for (const item of cart.cartItems) {
        await prisma.book.update({
            where: {
                isbn: item.book.isbn,
            },
            data: {
                quantity: {
                    decrement: item.quantity,
                },
            },
        });
    }
    await prisma.cartItem.deleteMany({
        where: {
            cartId: Number(paymentIntents.metadata.cartId),
        },
    });
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
                    <Link
                        href={"/"}
                        className="text-lg font-bold hover:underline"
                    >
                        Return to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
