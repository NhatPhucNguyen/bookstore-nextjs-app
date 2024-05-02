"use client";
import React from "react";
import Image from "next/image";
import { Author } from "@prisma/client";
import Button from "@/app/components/Button";
import { useModalContext } from "@/app/context/ModalContext";
import { deleteAuthor } from "../actions";
import { useToastContext } from "@/app/context/ToastContext";
import { useRouter } from "next/navigation";
const AuthorImage = ({ author }: { author: Author }) => {
    const { openModal } = useModalContext();
    const { toastError, toastSuccess } = useToastContext();
    const router = useRouter();
    return (
        <section className="md:sticky top-2 h-fit w-full float-start">
            <figure>
                <Image
                    unoptimized
                    src={author.imageUrl || "/unknown-person.png"}
                    alt={"Author image"}
                    width={0}
                    height={0}
                    sizes="100%"
                    onError={(e) => {
                        e.currentTarget.src = "/unknown-person.png";
                    }}
                    objectFit="content"
                    style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                    }}
                />
                <figcaption className="text-center font-bold italic text-md mt-2 ">
                    {author.name}
                </figcaption>
                {author.dateOfBirth && (
                    <figcaption className="text-center text-sm mt-2">
                        Born in: {`${author.dateOfBirth.getUTCFullYear()}`}
                    </figcaption>
                )}
            </figure>
            <div className="flex flex-row gap-1 justify-center px-2 mt-1">
                <Button
                    onClick={() => {
                        openModal({
                            formName: "updateAuthor",
                            data: {
                                author,
                            },
                        });
                    }}
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={async () => {
                        const { error } = await deleteAuthor(author.id);
                        if (error) {
                            toastError(error.message);
                            return;
                        }
                        toastSuccess("Author deleted successfully!");
                        router.push("/control/authors");
                    }}
                >
                    Delete
                </Button>
            </div>
        </section>
    );
};

export default AuthorImage;
