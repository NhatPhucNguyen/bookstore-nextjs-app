"use server";
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import prisma from "./prisma";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export type SessionPayload = {
    id: string;
    role: string;
};
export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
};

export const decrypt = async (session: string | undefined = "") => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log(error);
        return { error: { message: "Invalid session" } };
    }
};

export const createSession = async (payload: SessionPayload) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt(payload);
    cookies().set("session", session, {
        expires: expiresAt,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
};

export const updateSession = async () => {
    const session = cookies().get("session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
};

export const deleteSession = async () => {
    cookies().delete("session");
};

export const verifySession = cache(async () => {
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
        return null;
    }
    const session = (await decrypt(cookie)) as { id: string };

    if (!session?.id) {
        redirect("/login");
    }

    return { isAuth: true, id: session.id };
});

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.id },
        });
        return user;
    } catch (error) {
        console.log("Failed to fetch user");
        return null;
    }
});
