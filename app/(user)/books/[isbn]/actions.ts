"use server";
import { BookDetails } from "@/app/(admin)/control/books/BookDataGrid";
import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { calculateRatingAvg } from "../../../utils/calculateRatingAvg";

export const getRelatedBooks = async (book: BookDetails, limit?: number) => {
    const subjectsId = book.subjects.map((subject) => ({
        id: subject.id,
    }));
    const authorsId = book.authors.map((author) => ({
        id: author.id,
    }));
    try {
        const books = await prisma.book.findMany({
            include: {
                authors: true,
                subjects: true,
                reviews: true,
            },
            where: {
                OR: [
                    {
                        subjects: {
                            some: {
                                OR: subjectsId,
                            },
                        },
                    },
                    {
                        authors: {
                            some: {
                                OR: authorsId,
                            },
                        },
                    },
                ],
            },
        });
        if (books.length < 1) {
            const books = await prisma.book.findMany({
                include: {
                    authors: true,
                    subjects: true,
                },
                take: limit || 4,
            });
            return { books };
        }
        const newBooks = books.map((book) => {
            const rating = calculateRatingAvg(book.reviews);
            return {
                ...book,
                rating,
            };
        });
        return { books: newBooks };
    } catch (e) {
        return {
            error: { message: "Failed to get related books" },
        };
    }
};

export const createReview = async (isbn: string, rating: number) => {
    try {
        const user = await getUser();
        if (!user) {
            return {
                error: { message: "You must be logged in to submit a review" },
            };
        }
        const foundReview = await prisma.review.findFirst({
            where: {
                bookIsbn: isbn,
                userId: user.id,
            },
        });
        if (foundReview) {
            await prisma.review.update({
                where: {
                    id: foundReview.id,
                },
                data: {
                    rating,
                },
            });
            revalidatePath(`/books/${isbn}`);
            return { success: true };
        }
        await prisma.review.create({
            data: {
                rating,
                book: {
                    connect: {
                        isbn,
                    },
                },
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        revalidatePath(`/books/${isbn}`);
        return { success: true };
    } catch (e) {
        return {
            error: { message: "Failed to submit review" },
        };
    }
};

export const getUserRating = async (isbn: string) => {
    const user = await getUser();
    if (!user) {
        return null;
    }
    const review = await prisma.review.findFirst({
        where: {
            bookIsbn: isbn,
            userId: user.id,
        },
        select: {
            rating: true,
        },
    });
    return review?.rating || 0;
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
            revalidatePath("/checkout")
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
        revalidatePath("/checkout")
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
