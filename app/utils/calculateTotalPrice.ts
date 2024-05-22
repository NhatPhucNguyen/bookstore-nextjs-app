import { BookCartItem } from "../(payment)/cart/Cart";
const TAX = 0.13;
export const calculateTotalPrice = (cartItems: BookCartItem[] | null) => {
    if (cartItems === null || cartItems.length === 0)
        return { subTotal: 0, finalTotal: 0, tax: 0 };
    const subTotal = cartItems.reduce((total, item) => {
        const finalPrice =
            item.book.discount > 0
                ? (item.book.price * (100 - item.book.discount)) / 100
                : item.book.price;
        return total + finalPrice * item.quantity;
    }, 0);
    const tax = subTotal * TAX;
    const finalTotal = subTotal + tax;
    return { subTotal, finalTotal, tax };
};
