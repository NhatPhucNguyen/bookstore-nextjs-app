"use client";
import React from "react";
import Heading from "../components/Heading";
import Button from "@/app/components/Button";
import { useModalContext } from "@/app/context/ModalContext";

const BookHeading = () => {
    const { openModal } = useModalContext();
    return (
        <Heading title="Books" className="sm:mt-10">
            <div className="text-md">
                <Button
                    onClick={() => {
                        openModal({ formName: 'addBook' })
                    }}
                >
                    Add Book
                </Button>
            </div>
        </Heading>
    );
};

export default BookHeading;
