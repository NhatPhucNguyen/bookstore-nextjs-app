import React, { ReactNode } from "react";
const FormController = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return <div className={`w-full mb-2 ${className}`}>{children}</div>;
};
const Login = () => {
    return (
        <div className="w-full px-2 md:w-1/2 py-16 mx-auto animate-fade-in-down">
            <form className="w-full bg-black bg-opacity-50 p-4 rounded-2xl md:p-8">
                <h1 className="text-center font-bold text-2xl">BookFinder</h1>
                <h2 className="text-center font-semibold text-lg">
                    Log into your account
                </h2>
                <FormController>
                    <label htmlFor="email" className="font-bold">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <FormController>
                    <label htmlFor="password" className="font-bold">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full p-2 border-none outline-none rounded-md text-white bg-secondary placeholder:text-gray-300 focus:bg-opacity-50"
                    />
                </FormController>
                <FormController className="flex justify-center mt-4">
                    <button className="w-52 py-1 bg-secondary rounded-md hover:bg-white hover:text-secondary font-bold">Login</button>
                </FormController>
            </form>
        </div>
    );
};

export default Login;
