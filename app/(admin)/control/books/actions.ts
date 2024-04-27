"use server";

import prisma from "@/app/lib/prisma";
import { BookInput } from "./BookForm";
import { revalidatePath } from "next/cache";

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
                isbn: bookInput.isbn,
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

export const getAllBooks = async () => {
    try {
        const books = await prisma.book.findMany({
            include: {
                authors: true,
                subjects: true,
            },
        });
        return { books };
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
        const newBook = await prisma.book.update({
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
