"use server";
import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/session";
import { revalidatePath } from "next/cache";

export const getCart = async () => {
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
            id: true,
        },
    });
    if (!cart) {
        return null;
    }
    return cart;
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

export const addToCart = async (isbn: string, quantity: number) => {
    try {
        const user = await getUser();
        if (!user) {
            return {
                error: {
                    message: "You must be logged in to add to cart",
                },
            };
        }
        const book = await prisma.book.findFirst({
            where: {
                isbn,
            },
        });
        if (!book) {
            return {
                error: {
                    message: "Book not found",
                },
            };
        }
        if (book.quantity < quantity) {
            return {
                error: {
                    message: "Not enough stock",
                },
            };
        }
        const foundCart = await prisma.cart.findFirst({
            where: {
                userId: user.id,
            },
        });
        // If cart exists, check if item exists
        if (foundCart) {
            const foundItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: foundCart.id,
                    bookIsbn: isbn,
                },
            });
            if (foundItem) {
                await prisma.cartItem.update({
                    where: {
                        id: foundItem.id,
                    },
                    data: {
                        quantity,
                    },
                });
                return { success: true };
            }
            await prisma.cartItem.create({
                data: {
                    quantity,
                    book: {
                        connect: {
                            isbn,
                        },
                    },
                    cart: {
                        connect: {
                            id: foundCart.id,
                        },
                    },
                },
            });
            revalidatePath("/checkout");
            return { success: true };
        }
        // If cart doesn't exist, create cart and add item
        await prisma.cart.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                cartItems: {
                    create: {
                        quantity,
                        book: {
                            connect: {
                                isbn,
                            },
                        },
                    },
                },
            },
        });
        revalidatePath("/checkout");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to add to cart",
            },
        };
    }
};

export const getCartItemsNumber = async () => {
    const user = await getUser();
    if (!user) {
        return 0;
    }
    const cart = await prisma.cart.findFirst({
        where: {
            userId: user.id,
        },
        select: {
            cartItems: {
                select: {
                    quantity: true,
                },
            },
        },
    });
    if (!cart) {
        return 0;
    }
    const total = cart.cartItems.length;
    return total;
};
