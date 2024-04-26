"use client";

import React from "react";
import Heading from "../components/Heading";
import Button from "@/app/components/Button";
import { useModalContext } from "@/app/context/ModalContext";

const SubjectHeading = () => {
    const { openModal } = useModalContext();
    return (
        <Heading title="Subjects" className="sm:mt-10">
            <Button
                onClick={() => {
                    openModal({ formName: "addSubject" });
                }}
            >
                Add Subject
            </Button>
        </Heading>
    );
};

export default SubjectHeading;
