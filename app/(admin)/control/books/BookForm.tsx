"use client";
import Button from "@/app/components/Button";
import FormController from "@/app/components/FormController";
import { useModalContext } from "@/app/context/ModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { z } from "zod";
import { getAuthors } from "../authors/actions";
import { useToastContext } from "@/app/context/ToastContext";
import { useEffect, useState } from "react";
import { getSubjects } from "../subjects/actions";
import { createBook, updateBook } from "./actions";
const bookSchema = z.object({
    isbn: z
        .string()
        .min(1, {
            message: "ISBN/ASIN is required",
        })
        .max(13, {
            message: "ISBN/ASIN must be 13 characters",
        }),
    title: z.string().min(1, {
        message: "Title is required",
    }),
    imageUrl: z
        .string()
        .url({
            message: "Invalid URL",
        })
        .optional()
        .or(z.literal("")),
    publishedDate: z.coerce
        .date()
        .optional()
        .or(z.literal(""))
        .transform((date) => {
            return date ? date : null;
        }),
    price: z.coerce
        .number({
            message: "Price is required",
        })
        .multipleOf(0.01, {
            message: "Price must be in cents",
        })
        .min(0, {
            message: "Price must be greater than 0",
        }),
    quantity: z.coerce
        .number()
        .min(0, {
            message: "Quantity must be greater than 0",
        })
        .optional()
        .or(z.literal(0)),
    discount: z.coerce
        .number()
        .min(0, {
            message: "Discount must be greater than 0",
        })
        .max(100, {
            message: "Discount must be less than 100",
        })
        .optional()
        .or(z.literal(0)),
    authors: z
        .string({
            message: "Author is required",
        })
        .array()
        .min(1, {
            message: "Author is required",
        }),
    subjects: z
        .string({
            message: "Subject is required",
        })
        .array()
        .min(1, {
            message: "Subject is required",
        }),
    description: z.string().optional(),
});
export type BookInput = z.infer<typeof bookSchema>;
const BookForm = ({
    book,
}: {
    book?: Prisma.BookGetPayload<{
        include: {
            subjects: true;
            authors: true;
        };
    }>;
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<BookInput>({
        resolver: zodResolver(bookSchema),
        defaultValues: book
            ? ({
                  isbn: book.isbn,
                  title: book.title,
                  imageUrl: book.imageUrl || "",
                  publishedDate: book.publishedDate,
                  price: book.price,
                  quantity: book.quantity,
                  discount: book.discount,
                  description: book.description,
              } as BookInput)
            : undefined,
    });
    const { closeModal } = useModalContext();
    const { toastSuccess, toastError } = useToastContext();
    const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
    const onSubmit = async (data: BookInput) => {
        if (book) {
            const { error } = await updateBook(book.isbn, data);
            if (error) {
                return toastError(error.message);
            }
            toastSuccess("Book updated successfully");
            return closeModal();
        }
        const { error } = await createBook(data);
        if (error) {
            return toastError(error.message);
        }
        toastSuccess("Book added successfully");
        return closeModal();
    };
    useEffect(() => {
        if (book) {
            setValue(
                "authors",
                book.authors.map((author) => author.id)
            );
            setValue(
                "subjects",
                book.subjects.map((subject) => subject.id)
            );
        }
    }, [book, setValue]);
    return (
        <div className="bg-white text-black w-full h-fit m-auto py-2 px-2 sm:px-10 sm:py-4 xl:mt-4">
            <h2 className="font-bold text-2xl">{book ? "Edit" : "Add"} Book</h2>
            <form
                className="md:grid grid-cols-2 gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormController error={errors.isbn}>
                    <label htmlFor="isbn" className="font-bold">
                        ISBN/ASIN
                    </label>
                    <input
                        {...register("isbn")}
                        type="text"
                        placeholder="Enter unique ISBN"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                        disabled={!!book}
                    />
                </FormController>
                <FormController error={errors.title}>
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <input
                        {...register("title")}
                        type="text"
                        placeholder="Enter book title"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                    />
                </FormController>
                <FormController error={errors.imageUrl}>
                    <label htmlFor="coverUrl" className="font-bold">
                        Cover Image URL
                    </label>
                    <input
                        {...register("imageUrl")}
                        type="text"
                        placeholder="Enter cover image URL"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                    />
                </FormController>
                <FormController error={errors.publishedDate}>
                    <label htmlFor="publishedDate" className="font-bold">
                        Published Date
                    </label>
                    <input
                        {...register("publishedDate")}
                        type="date"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                    />
                </FormController>
                <FormController error={errors.price}>
                    <label htmlFor="price" className="font-bold">
                        Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-1 top-2">$</span>
                        <input
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                            type="number"
                            className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100 pl-6"
                            placeholder="Enter book price"
                            step={0.01}
                        />
                    </div>
                </FormController>
                <FormController error={errors.quantity}>
                    <label htmlFor="quantity" className="font-bold">
                        Quantity
                    </label>
                    <input
                        {...register("quantity")}
                        type="number"
                        placeholder="Enter book quantity"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                    />
                </FormController>
                <FormController error={errors.discount}>
                    <label htmlFor="price" className="font-bold">
                        Discount
                    </label>
                    <div className="relative">
                        <span className="absolute left-1 top-2">%</span>
                        <input
                            {...register("discount")}
                            type="number"
                            className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100 pl-6"
                            placeholder="Enter book discount"
                        />
                    </div>
                </FormController>
                <FormController error={errors.authors}>
                    <label htmlFor="authors" className="font-bold">
                        Authors
                    </label>
                    <AsyncSelect
                        {...register("authors")}
                        isMulti
                        cacheOptions
                        defaultOptions
                        defaultValue={book?.authors.map((subject) => ({
                            label: subject.name,
                            value: subject.id,
                        }))}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                minHeight: "2.6rem",
                                maxHeight: "5rem",
                                overflow: "auto",
                            }),
                        }}
                        onChange={(option) => {
                            setValue(
                                "authors",
                                option.map(
                                    (o: { label: string; value: string }) =>
                                        o.value
                                ),
                                {
                                    shouldValidate: true,
                                }
                            );
                        }}
                        loadOptions={async (inputValue: string) => {
                            setIsLoadingAuthors(true);
                            const { authors, error } = await getAuthors(
                                inputValue
                            );
                            if (error) {
                                toastError(error.message);
                                return [];
                            }
                            if (!inputValue) {
                                setIsLoadingAuthors(false);
                                return authors.map((author) => ({
                                    label: author.name,
                                    value: author.id,
                                }));
                            }
                            setIsLoadingAuthors(false);
                            return authors.map((author) => ({
                                label: author.name,
                                value: author.id,
                            }));
                        }}
                        isLoading={isLoadingAuthors}
                    />
                </FormController>
                <FormController error={errors.subjects}>
                    <label htmlFor="subject" className="font-bold">
                        Subjects
                    </label>
                    <AsyncSelect
                        {...register("subjects")}
                        isMulti
                        defaultOptions
                        defaultValue={book?.subjects.map((subject) => ({
                            label: subject.name,
                            value: subject.id,
                        }))}
                        cacheOptions
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                minHeight: "2.6rem",
                                maxHeight: "5rem",
                                overflow: "auto",
                            }),
                        }}
                        onChange={(option) => {
                            setValue(
                                "subjects",
                                option.map((o) => o.value),
                                {
                                    shouldValidate: true,
                                }
                            );
                        }}
                        loadOptions={async (inputValue: string) => {
                            setIsLoadingSubjects(true);
                            const { subjects, error } = await getSubjects(
                                inputValue
                            );
                            if (error) {
                                toastError(error.message);
                                return [];
                            }
                            if (!inputValue) {
                                setIsLoadingSubjects(false);
                                return subjects.map((subject) => ({
                                    label: subject.name,
                                    value: subject.id,
                                }));
                            }
                            setIsLoadingSubjects(false);
                            return subjects.map((subject) => ({
                                label: subject.name,
                                value: subject.id,
                            }));
                        }}
                        isLoading={isLoadingSubjects}
                    />
                </FormController>
                <FormController className="col-span-2">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        placeholder="Enter book description"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100"
                        rows={5}
                    />
                </FormController>
                <div className="w-full flex flex-row gap-4 justify-between mt-4 pb-1 col-span-2">
                    <Button type="submit">{book ? "Update" : "Add"}</Button>
                    <Button
                        type="button"
                        className="bg-orange-400 hover:bg-orange-600"
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
