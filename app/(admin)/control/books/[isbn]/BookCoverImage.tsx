"use client";
import React from "react";
import { BookDetails } from "../BookDataGrid";
import Image from "next/image";
import { Author, Book } from "@prisma/client";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/app/context/ModalContext";
import { useToastContext } from "@/app/context/ToastContext";
import { deleteBook } from "@/app/actions/bookActions";

const BookCoverImage = ({ book }: { book: BookDetails }) => {
    const router = useRouter();
    const { openModal } = useModalContext();
    const { toastError, toastSuccess } = useToastContext();
    return (
        <figure>
            <Image
                unoptimized
                src={book.imageUrl || "/unknown-book.png"}
                alt={"Book cover image"}
                width={0}
                height={0}
                sizes="100%"
                onError={(e) => {
                    e.currentTarget.src = "/unknown-book.png";
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
                {book.title}
            </figcaption>
            <div className="flex flex-row gap-1 justify-center px-2 mt-1">
                <Button
                    onClick={() => {
                        openModal({
                            formName: "updateBook",
                            data: {
                                book,
                            },
                        });
                    }}
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={async () => {
                        const { error } = await deleteBook(book.isbn);
                        if (error) {
                            toastError(error.message);
                            return;
                        }
                        toastSuccess("Book deleted successfully!");
                        router.push("/control/books");
                    }}
                >
                    Delete
                </Button>
            </div>
        </figure>
    );
};

export default BookCoverImage;
