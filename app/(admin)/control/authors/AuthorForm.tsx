"use client";
import Button from "@/app/components/Button";
import FormController from "@/app/components/FormController";
import { useModalContext } from "@/app/context/ModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Author } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToastContext } from "@/app/context/ToastContext";
import { createAuthor, updateAuthor } from "@/app/actions/authorActions";
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
    dateOfBirth: z.coerce
        .date()
        .refine((date) => date < new Date(), {
            message: "Invalid date of birth",
        })
        .optional()
        .or(z.literal(""))
        .transform((date) => {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        }),
    website: z
        .string()
        .url({
            message: "Invalid URL",
        })
        .optional()
        .or(z.literal("")),
});
type AuthorFormProps = {
    author?: Author;
};
const AuthorForm = ({ author }: AuthorFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Author>({
        resolver: zodResolver(authorSchema),
        defaultValues: author
            ? {
                  name: author.name,
                  bio: author.bio,
                  imageUrl: author.imageUrl,
                  website: author.website,
              }
            : undefined,
    });
    const { closeModal } = useModalContext();
    const { toastError, toastSuccess } = useToastContext();
    const onSubmit = handleSubmit(async (data) => {
        //update author if author exists
        if (author) {
            const response = await updateAuthor(author.id, data);
            if (response?.message) {
                toastError(response.message);
                return;
            }
            toastSuccess("Author updated successfully!");
            return closeModal();
        }
        //create author
        const response = await createAuthor(data);
        if (response?.message) {
            toastError(response.message);
            return;
        }
        toastSuccess("Author added successfully!");
        return closeModal();
    });
    return (
        <div className="bg-white text-black w-full h-fit m-auto py-2 px-2 sm:px-10 sm:py-4 sm:w-3/4 lg:w-1/2 xl:mt-4">
            <h2 className="font-bold text-2xl">{author ? "Edit" : "Add"} Author</h2>
            <form onSubmit={onSubmit}>
                <FormController error={errors.name}>
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter author name"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
                    />
                </FormController>
                <FormController error={errors.bio}>
                    <label htmlFor="bio" className="font-bold">
                        Bio:
                    </label>
                    <textarea
                        {...register("bio")}
                        placeholder="Enter author bio"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
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
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
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
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
                        defaultValue={
                            author?.dateOfBirth?.toISOString().split("T")[0]
                        }
                    />
                </FormController>
                <FormController error={errors.website}>
                    <label htmlFor="website" className="font-bold">
                        Website:
                    </label>
                    <input
                        type="text"
                        {...register("website")}
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
                        placeholder="Enter author website URL"
                    />
                </FormController>
                <div className="w-full flex flex-row gap-4 justify-between mt-4 pb-1">
                    <Button type="submit">{author ? "Update" : "Add"}</Button>
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
