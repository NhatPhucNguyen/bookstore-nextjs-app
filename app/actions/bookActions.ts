"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { calculateRatingAvg } from "@/app/utils/calculateRatingAvg";
import { BookInput } from "../(admin)/control/books/BookForm";
import { BookDetails } from "../(admin)/control/books/BookDataGrid";

export const createBook = async (bookInput: BookInput) => {
    try {
        const foundBook = await prisma.book.findUnique({
            where: {
                isbn: bookInput.isbn,
            },
        });
        if (foundBook) {
            return {
                error: {
                    message: "Book already exists with this ISBN",
                },
            };
        }
        await prisma.book.create({
            data: {
                title: bookInput.title,
                description: bookInput.description,
                isbn: bookInput.isbn.trim(),
                publishedDate: bookInput.publishedDate,
                price: bookInput.price,
                imageUrl: bookInput.imageUrl,
                discount: bookInput.discount,
                quantity: bookInput.quantity,
                subjects: {
                    connect: bookInput.subjects.map((item) => ({ id: item })),
                },
                authors: {
                    connect: bookInput.authors.map((item) => ({ id: item })),
                },
            },
        });
        revalidatePath("/control");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to create book",
            },
        };
    }
};
type GetBookOptions = {
    quantity?: number;
    rating?: "asc" | "desc";
    subjectId?: string;
};
export const getAllBooks = async (options?: GetBookOptions) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                authors: true,
                subjects: true,
                reviews: true,
            },
            orderBy: {
                updatedAt: !options?.rating ? "desc" : undefined,
            },
            take: options?.quantity,
            where: {
                subjects: {
                    some: {
                        id: {
                            equals: options?.subjectId,
                        },
                    },
                },
            },
        });
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
            error: { message: "Failed to get books" },
        };
    }
};

export const updateBook = async (isbn: string, bookInput: BookInput) => {
    try {
        const foundBook = await prisma.book.findUnique({
            where: {
                isbn: bookInput.isbn,
            },
            include: {
                subjects: true,
                authors: true,
            },
        });
        if (!foundBook) {
            return {
                error: {
                    message: "Book doest not exists with this ISBN",
                },
            };
        }
        const diffSubjects = foundBook.subjects
            .map((subject) => subject.id)
            .filter((id) => !bookInput.subjects.includes(id))
            .map((item) => ({ id: item }));
        const diffAuthors = foundBook.authors
            .map((author) => author.id)
            .filter((id) => !bookInput.authors.includes(id))
            .map((item) => ({ id: item }));
        await prisma.book.update({
            where: { isbn },
            data: {
                title: bookInput.title,
                description: bookInput.description,
                publishedDate: bookInput.publishedDate,
                price: bookInput.price,
                imageUrl: bookInput.imageUrl,
                discount: bookInput.discount,
                quantity: bookInput.quantity,
                subjects: {
                    connect: bookInput.subjects.map((item) => ({ id: item })),
                    disconnect: diffSubjects,
                },
                authors: {
                    connect: bookInput.authors.map((item) => ({ id: item })),
                    disconnect: diffAuthors,
                },
            },
            include: {
                authors: true,
                subjects: true,
            },
        });
        revalidatePath("/control/books");
        return { success: true };
    } catch (e) {
        console.log(e);
        return {
            error: { message: "Failed to update book" },
        };
    }
};

export const getBookByIsbn = async (isbn: string) => {
    try {
        const book = await prisma.book.findFirstOrThrow({
            where: {
                isbn,
            },
            include: {
                authors: true,
                subjects: true,
                reviews: true,
            },
        });
        return { book };
    } catch (e) {
        console.log(e);
        return {
            error: { message: "Failed to get book" },
        };
    }
};

export const deleteBook = async (isbn: string) => {
    try {
        await prisma.book.delete({
            where: { isbn },
        });
        revalidatePath("/control/books");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to delete book",
            },
        };
    }
};

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