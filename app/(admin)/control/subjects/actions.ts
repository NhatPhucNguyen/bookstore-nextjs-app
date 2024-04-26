"use server";
import prisma from "@/app/lib/prisma";
import { Subject } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createSubject = async (subject: Subject) => {
    try {
        await prisma.subject.create({
            data: subject,
        });
        revalidatePath("/control/subjects");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to create subject",
            },
        };
    }
};

export const getSubjects = async () => {
    try {
        const subjects = await prisma.subject.findMany({
            orderBy: { updatedAt: "desc" },
        });
        return { subjects };
    } catch (e) {
        return {
            error: { errorMessage: "Failed to get subjects" },
        };
    }
};

export const updateSubject = async (id: string, subject: Subject) => {
    try {
        await prisma.subject.update({
            where: { id },
            data: subject,
        });
        revalidatePath("/control/subjects");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to update subject",
            },
        };
    }
};

export const deleteSubject = async (id: string) => {
    try {
        await prisma.subject.delete({
            where: { id },
        });
        revalidatePath("/control/subjects");
        return { success: true };
    } catch (error) {
        return {
            error: {
                message: "Failed to delete subject",
            },
        };
    }
};
