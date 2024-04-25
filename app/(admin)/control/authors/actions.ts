"use server";

import prisma from "@/app/lib/prisma";
import { Button } from "@mui/material";
import { Author } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createAuthor = async (author: Author) => {
    try {
        await prisma.author.create({
            data: author,
        });
        revalidatePath("/control/authors");
    } catch (e) {
        return {
            message: "Failed to create author!",
        };
    }
};

export const getAuthors = async () => {
    try {
        const authors = await prisma.author.findMany({
            orderBy: {
                updatedAt: "asc",
            },
        });
        return {
            authors: authors as Author[],
        };
    } catch (e) {
        return {
            errorMessage: "Failed to get authors!",
        };
    }
};

export const updateAuthor = async (id: string, author: Author) => {
    try {
        await prisma.author.update({
            where: {
                id,
            },
            data: author,
        });
        revalidatePath("/control/authors");
    } catch (e) {
        return {
            message: "Failed to update author!",
        };
    }
};

export const deleteAuthor = async (id: string) => {
    try {
        await prisma.author.delete({
            where: {
                id,
            },
        });
        revalidatePath("/control/authors");
    } catch (e) {
        return {
            errorMessage: "Failed to delete author!",
        };
    }
};
