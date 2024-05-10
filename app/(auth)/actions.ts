"use server";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
export const signup = async (email: string, password: string) => {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (foundUser) {
            return {
                error: {
                    message: "User already exists",
                },
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        await createSession({
            id: createdUser.id,
            role: createdUser.role,
        });
    } catch (error) {
        return {
            error: {
                message:
                    "An error occurred while creating the user. Please try again.",
            },
        };
    }
    redirect("/books");
};

export const login = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return {
                error: {
                    message: "User not found",
                },
            };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                error: {
                    message: "Invalid password",
                },
            };
        }
        await createSession({
            id: user.id,
            role: user.role,
        });
    } catch (error) {
        return {
            error: {
                message:
                    "An error occurred while logging in. Please try again.",
            },
        };
    }
};

export const logout = async () => {
    await deleteSession();
};
