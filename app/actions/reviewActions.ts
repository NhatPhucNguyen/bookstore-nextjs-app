import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getUser } from "../lib/session";

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
