"use client";
import Button from "@/app/components/Button";
import FormController from "@/app/components/FormController";
import { useModalContext } from "@/app/context/ModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Author } from "@prisma/client";
import path from "path";
import React from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
const authorSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    bio: z.string().nullable(),
    imageUrl: z
        .string()
        .url({
            message: "Invalid URL",
        })
        .optional()
        .or(z.literal("")),
    dateOfBirth: z.string().date().refine((date) => new Date(date) < new Date(),{
        message:"Invalid date of birth"
    }).optional().or(z.literal("")),
    website: z
        .string()
        .url({
            message: "Invalid URL",
        })
        .optional()
        .or(z.literal("")),
});
type AuthorSchema = z.infer<typeof authorSchema>;
const AuthorForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthorSchema>({
        resolver: zodResolver(authorSchema),
    });
    const { closeModal } = useModalContext();
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    return (
        <div className="bg-white text-black w-full h-fit m-auto py-2 px-2 sm:px-10 sm:py-4 sm:w-3/4 lg:w-1/2 xl:mt-4">
            <h2 className="font-bold text-xl">Add Author</h2>
            <form onSubmit={onSubmit}>
                <FormController error={errors.name}>
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter author name"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 border "border-gray-300" focus:bg-green-100 ${errors.name && "border-red-500"}`}
                    />
                </FormController>
                <FormController error={errors.bio}>
                    <label htmlFor="bio" className="font-bold">
                        Bio:
                    </label>
                    <textarea
                        {...register("bio")}
                        placeholder="Enter author bio"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 border "border-gray-300" focus:bg-green-100 ${errors.bio && "border-red-500"}`}
                        rows={5}
                    />
                </FormController>
                <FormController error={errors.imageUrl}>
                    <label htmlFor="image" className="font-bold">
                        Image:
                    </label>
                    <input
                        type="text"
                        {...register("imageUrl")}
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 border "border-gray-300" focus:bg-green-100 ${errors.imageUrl && "border-red-500"}`}
                        placeholder="Enter author image URL"
                    />
                </FormController>
                <FormController error={errors.dateOfBirth}>
                    <label htmlFor="dateOfBirth" className="font-bold">
                        Date of Birth:
                    </label>
                    <input
                        type="date"
                        {...register("dateOfBirth")}
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 border "border-gray-300" focus:bg-green-100 ${errors.dateOfBirth && "border-red-500"}`}
                    />
                </FormController>
                <FormController error={errors.website}>
                    <label htmlFor="website" className="font-bold">
                        Website:
                    </label>
                    <input
                        type="text"
                        {...register("website")}
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 border "border-gray-300" focus:bg-green-100 ${errors.website && "border-red-500"}`}
                        placeholder="Enter author website URL"
                    />
                </FormController>
                <div className="w-full flex flex-row gap-4 justify-between mt-4 pb-1">
                    <Button type="submit">Add</Button>
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

export default AuthorForm;
