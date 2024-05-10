import { Metadata } from "next";
import RegisterForm from "./RegisterForm";
export const metadata: Metadata = {
    title: "Register",
    description: "Register page for BookFinder",
};
const RegisterPage = () => {
    return <RegisterForm />;
};

export default RegisterPage;
