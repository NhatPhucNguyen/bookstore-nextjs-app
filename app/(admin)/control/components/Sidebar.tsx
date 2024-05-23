"use client";
import React, { useState } from "react";
import Backdrop from "../../../components/Backdrop";
import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/authActions";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const closeSidebar = () => {
        setOpen(false);
    };
    const router = useRouter();
    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="h-fit w-fit inline-flex items-center p-2 mt-2 ms-3 text-sm text-blue-500 rounded-lg sm:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            <aside
                className={`${
                    open ? "translate-x-0" : "-translate-x-full"
                } flex sm:translate-x-0 flex-col fixed left-0 top-0 h-screen bg-[#152259] w-64 z-20 animate-sidebar transition-transform text-white`}
            >
                <section className="border-b-2 pb-3">
                    <Image
                        src={"/text-logo-trans.png"}
                        alt=""
                        width={100}
                        height={100}
                        className="mx-auto"
                        priority
                    />
                    <h1 className="font-bold text-center">BookFinder</h1>
                </section>
                <SidebarLinks closeSidebar={closeSidebar}/>
                <button
                    type="button"
                    className="block w-20 py-2 bg-active mt-auto mx-auto mb-4 rounded-md hover:bg-blueHover font-bold"
                    onClick={async ()=>{
                        await logout();
                        router.push("/login");
                    }}
                >
                    Logout
                </button>
            </aside>
            {open && (
                <Backdrop
                    handleClose={() => {
                        setOpen(false);
                    }}
                    className="sm:hidden"
                />
            )}
        </>
    );
};

export default Sidebar;
