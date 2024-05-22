import SubHeading from "@/app/components/SubHeading";
import { calculateTotalPrice } from "@/app/utils/calculateTotalPrice";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";
import { getCart } from "../cart/actions";
import CheckoutForm from "./CheckoutForm";
import ToastProvider from "@/app/context/ToastContext";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});
const PaymentPage = async () => {
    console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    const cart = await getCart();
    if (!cart) {
        return redirect("/checkout");
    }
    const paymentIntents = await stripe.paymentIntents.create({
        amount: Math.round(
            calculateTotalPrice(cart.cartItems).finalTotal * 100
        ),
        currency: "CAD",
        metadata: {
            cartId: cart.id,
        },
    });
    if (paymentIntents.client_secret === null) {
        return redirect("/checkout");
    }
    return (
        <ToastProvider>
            <SubHeading
                current="Payment"
                parent={[
                    {
                        name: "Home",
                        href: "/",
                    },
                ]}
            />
            <div className="px-2 mt-5">
                <CheckoutForm
                    clientSecret={paymentIntents.client_secret}
                    price={calculateTotalPrice(cart.cartItems)}
                />
            </div>
        </ToastProvider>
    );
};

export default PaymentPage;
