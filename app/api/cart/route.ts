import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/session";

export async function GET() {
    const user = await getUser();
    if (!user) {
        return Response.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
    const cart = await prisma.cart.findFirst({
        where: {
            userId: user.id,
        },
        include: {
            cartItems: true,
        },
    });
    if (!cart) {
        return new Response("No items in cart", { status: 200 });
    }
    return new Response(JSON.stringify(cart), {
        status: 200,
    });
}
