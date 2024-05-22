import SubHeading from "@/app/components/SubHeading";
import Cart from "./Cart";
import { getCart } from "./actions";
import ToastProvider from "@/app/context/ToastContext";
import { Metadata } from "next";
import { mainTitle } from "@/app/utils/globalVariables";
export const metadata: Metadata = {
    title: mainTitle + " | Cart",
};
const CheckoutPage = async () => {
    const cart = await getCart();
    return (
        <ToastProvider>
            <SubHeading
                current="Cart"
                parent={[
                    {
                        name: "Home",
                        href: "/",
                    },
                ]}
            />
            <div className="py-1">
                {cart?.cartItems && <Cart cartItems={cart?.cartItems} />}
            </div>
        </ToastProvider>
    );
};

export default CheckoutPage;
