import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboard2Line } from "react-icons/ri";
import React from "react";
import { IconType } from "react-icons";
import { IoIosPerson } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
type LinkItemProps = {
    href: string;
    displayName: string;
    Icon?: IconType;
};
const LinkItem = ({ href, displayName, Icon }: LinkItemProps) => {
    const pathName = usePathname();
    const isActive = pathName === href;
    return (
        <li className="w-full my-2 px-4">
            <Link
                href={href}
                className={`${
                    isActive ? "bg-active" : ""
                } block px-2 py-3 rounded-md hover:bg-blueHover`}
            >
                <div className="flex flex-row items-top">
                    {Icon && <Icon className="text-lg mr-2" />}
                    <span className="text-sm inline-block">{displayName}</span>
                </div>
            </Link>
        </li>
    );
};
const SidebarLinks = () => {
    return (
        <ul className="font-bold text-sm">
            <LinkItem
                href={"/control/dashboard"}
                displayName="Dashboard"
                Icon={RiDashboard2Line}
            />
            <LinkItem href={"/control/authors"} displayName="Authors" Icon={IoIosPerson}/>
            <LinkItem href={"/control/books"} displayName="Books" Icon={IoBookSharp}/>
            <LinkItem href={"/control/genres"} displayName="Genre" Icon={MdCategory}/>
            <LinkItem href={"/control/orders"} displayName="Orders" Icon={FaMoneyBillTrendUp}/>
        </ul>
    );
};

export default SidebarLinks;
