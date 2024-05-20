import SubHeading from "@/app/components/SubHeading";
import Cart from "./Cart";
import { getCartItems } from "./actions";
import ToastProvider from "@/app/context/ToastContext";

const CheckoutPage = async () => {
    const cartItems = await getCartItems();
    return (
        <ToastProvider>
            <SubHeading
                current="Checkout"
                parent={[
                    {
                        name: "Home",
                        href: "/",
                    },
                ]}
            />
            <div className="py-1">{cartItems && <Cart cartItems={cartItems} />}</div>
        </ToastProvider>
    );
};

export default CheckoutPage;
