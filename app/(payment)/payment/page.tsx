import SubHeading from "@/app/components/SubHeading";
import { calculateTotalPrice } from "@/app/utils/calculateTotalPrice";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";
import { getCart } from "../cart/actions";
import CheckoutForm from "./CheckoutForm";
import ToastProvider from "@/app/context/ToastContext";
import CartItem from "../cart/CartItem";
import { Metadata } from "next";
import { mainTitle } from "@/app/utils/globalVariables";
export const metadata:Metadata = {
    title: mainTitle + " | Checkout",
};
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
            <div className="px-2 mt-5 md:grid grid-cols-2 gap-2">
                <section>
                    {cart.cartItems.map((item) => {
                        return <CartItem cartItem={item} key={item.id} readOnly/>;
                    })}
                </section>
                <section className="mt-5 md:mt-0">
                    <CheckoutForm
                        clientSecret={paymentIntents.client_secret}
                        price={calculateTotalPrice(cart.cartItems)}
                    />
                </section>
            </div>
        </ToastProvider>
    );
};

export default PaymentPage;
