"use client";
import { useToastContext } from "@/app/context/ToastContext";
import { Card, CardActions, CardContent } from "@mui/material";
import {
    AddressElement,
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { FormEvent, useState } from "react";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
type CheckoutFormProps = {
    clientSecret: string;
    price: {
        finalTotal: number;
        subTotal: number;
        tax: number;
    };
};
const CheckoutForm = ({ clientSecret, price }: CheckoutFormProps) => {
    return (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
            <Form total={price.finalTotal} />
        </Elements>
    );
};
function Form({ total }: { total: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const { toastError } = useToastContext();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (stripe === null || elements === null) return;
        const response = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/success`,
            },
        });
        if (
            response.error.type == "card_error" ||
            response.error.type == "validation_error"
        ) {
            setIsLoading(false);
            return toastError(response.error.message || "An error occurred");
        } else {
            setIsLoading(false);
            return toastError("An error occurred");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardContent>
                    <h1 className="text-xl font-bold text-black mb-2">
                        Checkout
                    </h1>
                    <AddressElement options={{mode:"shipping",fields:{
                        phone:"always"
                    }}}/>
                    <PaymentElement />
                </CardContent>
                <CardActions sx={{ display: "block", textAlign: "center" }}>
                    <button
                        className="block w-full sm:w-1/2 mx-auto bg-secondary text-white py-1 rounded-md mb-2 disabled:opacity-50"
                        disabled={
                            stripe === null || elements === null || isLoading
                        }
                    >
                        {isLoading
                            ? "Processing..."
                            : `Confirm Payment - $${
                                  Math.round(total * 100) / 100
                              }`}
                    </button>
                    <Link
                        href={"/cart"}
                        className="text-secondary hover:underline"
                    >
                        Cancel Payment
                    </Link>
                </CardActions>
            </Card>
        </form>
    );
}
export default CheckoutForm;
