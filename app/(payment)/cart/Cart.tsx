import Link from "next/link";
import CartItem from "./CartItem";
import { calculateTotalPrice } from "@/app/utils/calculateTotalPrice";
export type BookCartItem = {
    book: {
        imageUrl: string | null;
        isbn: string;
        title: string;
        price: number;
        discount: number;
        quantity: number;
    };
    quantity: number;
    id: number;
};
const Cart = ({ cartItems }: { cartItems: BookCartItem[] }) => {
    const { finalTotal, subTotal, tax } = calculateTotalPrice(cartItems);
    return (
        <div className="mt-5 px-1 md:grid grid-cols-2 place-content-start gap-2">
            <section className="w-full">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => {
                        return <CartItem cartItem={item} key={item.id} />;
                    })
                ) : (
                    <h3 className="text-center text-black font-bold text-xl">
                        No items in cart
                    </h3>
                )}
            </section>
            <section className="bg-cart-bg h-fit bg-cover bg-center bg-blend-color-dodge mt-10 md:mt-2">
                <div className="h-full w-full bg-gray-200 bg-opacity-90 grid grid-cols-2 px-1 py-5 min-h-64">
                    <div className="px-2">
                        <h3 className="text-black text-xl font-bold">
                            Shopping Summary
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Please review your items before proceeding to
                            checkout.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Subtotal</span>
                            <span className="font-bold">
                                ${subTotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Tax</span>
                            <span className="font-bold">${tax.toFixed(2)}</span>
                        </div>
                        <hr className="border border-secondary mb-2" />
                        <div className="flex flex-row justify-between text-black mb-2 flex-wrap">
                            <span>Total</span>
                            <span className="font-bold">
                                ${finalTotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="w-full text-center mt-auto">
                            <Link
                                type="button"
                                className={`block mx-auto bg-secondary w-full rounded-md py-1 mb-2 hover:bg-white hover:text-secondary font-bold ${
                                    cartItems.length === 0
                                        ? "pointer-events-none bg-opacity-50"
                                        : "auto"
                                }`}
                                href={"/payment"}
                            >
                                Checkout
                            </Link>
                            <Link
                                href={"/books"}
                                className="text-sm text-center text-secondary hover:underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
