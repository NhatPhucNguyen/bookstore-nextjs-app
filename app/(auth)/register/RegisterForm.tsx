"use client";
import { useToastContext } from "@/app/context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "../actions";
import FormController from "@/app/components/FormController";
import Link from "next/link";
const SignUpSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }).trim(),
        password: z
            .string()
            .min(8, { message: "Be at least 8 characters long" })
            .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            .regex(/[0-9]/, { message: "Contain at least one number." })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Contain at least one special character.",
            })
            .trim(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type SignUpFormData = z.infer<typeof SignUpSchema>;
const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpSchema),
    });
    const { toastError } = useToastContext();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true);
        const res = await signup(data.email, data.password);
        if (res) {
            setLoading(false);
            toastError(res.error.message);
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="w-full px-2 md:w-1/2 py-16 mx-auto animate-fade-in-down">
            <form
                className="w-full bg-black bg-opacity-50 p-4 rounded-2xl md:p-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-center font-bold text-2xl">BookFinder</h1>
                <h2 className="text-center font-semibold text-lg">
                    {loading ? "Loading" : "Create an account"}
                </h2>
                <FormController error={errors.email}>
                    <label htmlFor="email" className="font-bold">
                        Email:
                    </label>
                    <input
                        type="text"
                        {...register("email")}
                        placeholder="Enter your email"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <FormController error={errors.password}>
                    <label htmlFor="password" className="font-bold">
                        Password:
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter your password"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <FormController error={errors.confirmPassword}>
                    <label htmlFor="confirmPassword" className="font-bold">
                        Confirm password:
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Enter your password"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <div className="text-white flex items-center flex-row gap-2">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            e.target.checked
                                ? setShowPassword(true)
                                : setShowPassword(false);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="block">Show password</span>
                </div>
                <FormController className="flex justify-center mt-4">
                    <button
                        className="w-52 py-1 bg-secondary rounded-md hover:bg-white hover:text-secondary font-bold"
                        type="submit"
                    >
                        Create an account
                    </button>
                </FormController>
                <hr className="mt-6 border" />
                <div className="text-center mt-4">
                    Already have an account ?
                </div>
                <FormController className="flex justify-center mt-4">
                    <Link
                        href={"/login"}
                        className="w-52 py-1 bg-cyan-500 rounded-md hover:bg-cyan-700 hover:text-white font-bold text-center"
                    >
                        Login
                    </Link>
                </FormController>
            </form>
        </div>
    );
};

export default RegisterForm;
