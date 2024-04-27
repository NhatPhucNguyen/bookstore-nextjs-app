"use client";
import Button from "@/app/components/Button";
import FormController from "@/app/components/FormController";
import { useModalContext } from "@/app/context/ModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subject } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSubject, updateSubject } from "./actions";
import { useToastContext } from "@/app/context/ToastContext";
const subjectSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().optional().or(z.literal("")),
});
const SubjectForm = ({ subject }: { subject?: Subject }) => {
    const { closeModal } = useModalContext();
    const { toastSuccess, toastError } = useToastContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Subject>({
        resolver: zodResolver(subjectSchema),
        defaultValues: subject
            ? { name: subject.name, description: subject.description }
            : undefined,
    });
    const onSubmit = async (data: Subject) => {
        if (subject) {
            const { error } = await updateSubject(subject.id, data);
            if (error) {
                return toastError(error.message);
            }
            toastSuccess("Subject updated successfully");
            return closeModal();
        }

        const { error } = await createSubject(data);
        if (error) {
            return toastError(error.message);
        }
        toastSuccess("Subject added successfully");
        return closeModal();
    };
    return (
        <div className="bg-white text-black w-full h-fit m-auto py-2 px-2 sm:px-10 sm:py-4 sm:w-3/4 lg:w-1/2 mt-[5%]">
            <h2 className="font-bold text-2xl">{subject ? "Edit" : "Add"} Subject</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormController error={errors.name}>
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Enter subject name"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
                    />
                </FormController>
                <FormController error={errors.description}>
                    <label htmlFor="description" className="font-bold">
                        Description:
                    </label>
                    <textarea
                        {...register("description")}
                        placeholder="Enter subject description"
                        className={`w-full p-2 outline-none rounded-md focus:bg-opacity-50 focus:bg-green-100`}
                        rows={5}
                    />
                </FormController>
                <div className="w-full flex flex-row gap-4 justify-between mt-4 pb-1">
                    <Button type="submit">{subject ? "Update" : "Add"}</Button>
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

export default SubjectForm;
