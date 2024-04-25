"use client";
import React from "react";
import Heading from "../components/Heading";
import Button from "@/app/components/Button";
import { useModalContext } from "@/app/context/ModalContext";

const AuthorHeading = () => {
    const { openModal } = useModalContext();
    return (
        <Heading title="Authors">
            <div className="text-md">
                <Button
                    onClick={() => {
                        openModal({ formName: "addAuthor" });
                    }}
                >
                    Add Authors
                </Button>
            </div>
        </Heading>
    );
};

export default AuthorHeading;
