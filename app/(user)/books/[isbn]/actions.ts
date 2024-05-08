import { BookDetails } from "@/app/(admin)/control/books/BookDataGrid";
import prisma from "@/app/lib/prisma";

export const getRelatedBooks = async (book: BookDetails,limit?:number) => {
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
        return { books };
    } catch (e) {
        return {
            error: { message: "Failed to get related books" },
        };
    }
};
