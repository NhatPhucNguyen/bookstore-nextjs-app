"use server";
import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/session";
import { revalidatePath } from "next/cache";

export const getCartItems = async () => {
    const user = await getUser();
    if (!user) {
        return null;
    }
    const cart = await prisma.cart.findFirst({
        where: {
            userId: user.id,
        },
        select: {
            cartItems: {
                select: {
                    book: {
                        select: {
                            price: true,
                            title: true,
                            isbn: true,
                            imageUrl: true,
                            discount: true,
                            quantity: true,
                        },
                    },
                    quantity: true,
                    id: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    if (!cart) {
        return null;
    }
    return cart.cartItems;
};

export const updateCartItemQuantity = async (id: number, quantity: number) => {
    try {
        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity,
            },
        });
        revalidatePath("/checkout");
        return { success: true };
    } catch (error) {
        console.log(error);
        return {
            error: {
                message: "Failed to update quantity !",
            },
        };
    }
};

export const removeCartItem = async (id: number) => {
    try {
        await prisma.cartItem.delete({
            where: {
                id,
            },
        });
        revalidatePath("/checkout");
        return { success: true };
    } catch (error) {
        console.log(error);
        return {
            error: {
                message: "Failed to remove item !",
            },
        };
    }
};
