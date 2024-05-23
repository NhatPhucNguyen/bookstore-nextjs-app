"use client";
import Link from "next/link";
import FormController from "../../components/FormController";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastContext } from "@/app/context/ToastContext";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/authActions";
const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z.string().min(1, { message: "Password is required" }),
});
type LoginFormData = z.infer<typeof LoginSchema>;
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });
    const { toastError } = useToastContext();
    const router = useRouter();
    const onSubmit = async (data: LoginFormData) => {
        const { error, role } = await login(data.email, data.password);
        if (error) {
            return toastError(error.message);
        }
        if (role === "ADMIN") {
            return router.push("/control/dashboard");
        }
        return router.push("/books");
    };
    return (
        <div className="w-full px-2 md:w-1/2 py-16 mx-auto animate-fade-in-down">
            <form
                className="w-full bg-black bg-opacity-50 p-4 rounded-2xl md:p-8"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <h1 className="text-center font-bold text-2xl">BookFinder</h1>
                <h2 className="text-center font-semibold text-lg">
                    Log into your account
                </h2>
                <FormController error={errors.email}>
                    <label htmlFor="email" className="font-bold">
                        Email:
                    </label>
                    <input
                        type="email"
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
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <div className="text-right">
                    <Link
                        href="/auth/forgot-password"
                        className="text-right underline"
                    >
                        Forgot your password
                    </Link>
                </div>
                <div className="text-white flex items-center flex-row gap-2">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="block">Keep me logged in</span>
                </div>
                <FormController className="flex justify-center mt-4">
                    <button
                        className="w-52 py-1 bg-secondary rounded-md hover:bg-white hover:text-secondary font-bold"
                        type="submit"
                    >
                        Login
                    </button>
                </FormController>
                <hr className="mt-6 border" />
                <div className="text-center mt-4">
                    Don&apos;t have an account ?
                </div>
                <FormController className="flex justify-center mt-4">
                    <Link
                        href={"/register"}
                        className="w-52 py-1 bg-cyan-500 rounded-md hover:bg-cyan-700 hover:text-white font-bold text-center"
                    >
                        Sign up
                    </Link>
                </FormController>
            </form>
        </div>
    );
};

export default Login;
