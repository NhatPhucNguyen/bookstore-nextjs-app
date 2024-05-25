"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { logout } from "../actions/authActions";

const MobileNavLink = ({
    href,
    name,
    closeDropdown,
}: {
    href: string;
    name: string;
    closeDropdown?: () => void;
}) => {
    const pathname = usePathname();
    const isCurrent = pathname === href;
    return (
        <Link
            href={href}
            className={`${
                isCurrent ? "bg-gray-800 text-white" : "text-gray-300"
            } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
            onClick={closeDropdown}
        >
            {name}
        </Link>
    );
};
type NavarProps = {
    simple?: boolean;
    isAuthenticated?: boolean;
    paymentLayout?: boolean;
};
const Navbar = ({ simple, isAuthenticated, paymentLayout }: NavarProps) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const closeDropdown = () => setOpenDropdown(false);
    return (
        <>
            <div className="w-full text-white h-15 flex justify-between items-center md:py-5">
                <div className="flex items-center text-xl font-bold">
                    <Image
                        src={"/text-logo-trans.png"}
                        alt=""
                        width={50}
                        height={50}
                    />
                    <span>BookFinder</span>
                </div>
                <ul className="hidden md:flex flex-row gap-4 mr-6 font-semibold">
                    <li>
                        <Link href={"/"} className={`hover:text-secondary`}>
                            Home
                        </Link>
                    </li>
                    {paymentLayout && (
                        <li>
                            <Link
                                href={"/books"}
                                className="hover:text-secondary"
                            >
                                Books
                            </Link>
                        </li>
                    )}
                    {!simple && (
                        <>
                            <li>
                                <Link
                                    href={"/books"}
                                    className="hover:text-secondary"
                                >
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="hover:text-secondary"
                                >
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"https://github.com/NhatPhucNguyen/bookstore-nextjs-app"}
                                    className="hover:text-secondary"
                                >
                                    About Us
                                </Link>
                            </li>
                            {!isAuthenticated && (
                                <li>
                                    <Link
                                        href={"/login"}
                                        className="hover:text-secondary"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </>
                    )}

                    <li>
                        {isAuthenticated ? (
                            <Link
                                href="/login"
                                className="bg-secondary text-white px-2 py-3 rounded-md hover:bg-white hover:text-secondary"
                                onClick={async () => {
                                    await logout();
                                }}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                href={"/register"}
                                className="bg-secondary text-white px-2 py-3 rounded-md hover:bg-white hover:text-secondary"
                            >
                                Create account
                            </Link>
                        )}
                    </li>
                    {!simple && isAuthenticated && <CartIcon />}
                </ul>
                {/* Mobile */}
                <div className="flex items-center gap-4 md:hidden w-fit px-2">
                    {!simple && isAuthenticated && <CartIcon />}
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-label="mobile-menu"
                        aria-expanded="false"
                        onClick={() => setOpenDropdown(!openDropdown)}
                    >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Open main menu</span>
                        {/* Icon when menu is closed.
                        Menu open: "hidden", Menu closed: "block"
                    */}
                        <svg
                            className={`${
                                openDropdown ? "hidden" : "block"
                            } h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        {/* Icon when menu is open.
                        Menu open: "block", Menu closed: "hidden"
                    */}
                        <svg
                            className={`${
                                openDropdown ? "block" : "hidden"
                            } h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`${
                    openDropdown ? "absolute" : "hidden"
                }  md:hidden w-full right-0 bg-gray-900 z-50`}
                id="mobile-menu"
                aria-label="mobile-dropdown"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <MobileNavLink href="/" name="Home" />
                    {paymentLayout && (
                        <MobileNavLink
                            href="/books"
                            name="Books"
                            closeDropdown={closeDropdown}
                        />
                    )}
                    {!simple && (
                        <>
                            <MobileNavLink
                                href="/books"
                                name="Books"
                                closeDropdown={closeDropdown}
                            />
                            <MobileNavLink
                                href="/"
                                name="Trending"
                                closeDropdown={closeDropdown}
                            />
                            <MobileNavLink
                                href="https://github.com/NhatPhucNguyen/bookstore-nextjs-app"
                                name="About Us"
                                closeDropdown={closeDropdown}
                            />
                            {!isAuthenticated && (
                                <MobileNavLink
                                    href="/login"
                                    name="Login"
                                    closeDropdown={closeDropdown}
                                />
                            )}
                        </>
                    )}

                    {isAuthenticated ? (
                        <Link
                            href="/login"
                            className="text-white bg-secondary hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            onClick={async () => {
                                await logout();
                            }}
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            href="/register"
                            className="text-white bg-secondary hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Create Account
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
