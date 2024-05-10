import Link from "next/link";
import FormController from "../../components/FormController";

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
                    <button className="w-52 py-1 bg-secondary rounded-md hover:bg-white hover:text-secondary font-bold">
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
