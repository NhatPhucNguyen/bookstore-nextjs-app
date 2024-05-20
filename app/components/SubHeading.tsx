import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
type SubHeadingProps = {
    parent?: { name: string; href: string }[];
    current: string;
};
const SubHeading = ({ parent, current }: SubHeadingProps) => {
    return (
        <Breadcrumbs className=" bg-white bg-opacity-50 py-3 px-10">
            {parent?.map((item,index) => (
                <Link key={index} href={item.href}>
                    {item.name}
                </Link>
            ))}
            <Typography color="black">{current}</Typography>
        </Breadcrumbs>
    );
};

export default SubHeading;
