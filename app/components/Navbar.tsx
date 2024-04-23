"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type NavarProps = {
    simple?: boolean;
};
const Navbar = ({ simple }: NavarProps) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    return (
        <>
            <div className="w-full text-white h-15 flex justify-between align items-center md:py-5">
                <div className="flex items-center text-xl font-bold">
                    <Image
                        src={"/bookstore-trans.png"}
                        alt=""
                        width={50}
                        height={50}
                    />
                    <span>BookFinder</span>
                </div>
                <ul className="hidden md:flex flex-row gap-4 mr-6 font-semibold">
                    <li>
                        <Link href={"/"} className="hover:text-secondary">
                            Home
                        </Link>
                    </li>
                    {!simple && (
                        <>
                            <li>
                                <Link
                                    href={"/"}
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
                                    href={"/"}
                                    className="hover:text-secondary"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/login"}
                                    className="hover:text-secondary"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}

                    <li>
                        <Link
                            href={"/register"}
                            className="bg-secondary text-white px-2 py-3 rounded-md hover:bg-white hover:text-secondary"
                        >
                            Create account
                        </Link>
                    </li>
                </ul>
                <button
                    type="button"
                    className="relative md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
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
            <div
                className={`${
                    openDropdown ? "absolute" : "hidden"
                }  md:hidden w-full right-0 bg-gray-900`}
                id="mobile-menu"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link
                        href="/"
                        className="bg-gray-800 text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Home
                    </Link>
                    {!simple && (
                        <>
                            <Link
                                href="#"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >
                                Books
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >
                                Trending
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/login"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >
                                Login
                            </Link>
                        </>
                    )}

                    <Link
                        href="/register"
                        className="text-white bg-secondary hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
