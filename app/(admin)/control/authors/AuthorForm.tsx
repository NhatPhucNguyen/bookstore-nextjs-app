import Button from "@/app/components/Button";
import FormController from "@/app/components/FormController";
import { useModalContext } from "@/app/context/ModalContext";
import React from "react";

const AuthorForm = () => {
    const {closeModal} = useModalContext();
    return (
        <div className="bg-white text-black w-full h-fit mt-24 py-2 px-2 sm:px-10 sm:py-4 sm:w-3/4 lg:w-1/2 lg:mt-20 xl:mt-4">
            <h2 className="font-bold text-xl">Add Author</h2>
            <form>
                <FormController>
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter author name"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 border border-gray-300 focus:bg-green-100"
                    />
                </FormController>
                <FormController>
                    <label htmlFor="bio" className="font-bold">
                        Bio:
                    </label>
                    <textarea
                        id="bio"
                        placeholder="Enter author bio"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 border border-gray-300 focus:bg-green-100"
                        rows={5}
                    />
                </FormController>
                <FormController>
                    <label htmlFor="image" className="font-bold">
                        Image:
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 border border-gray-300 focus:bg-green-100"
                        placeholder="Enter author image URL"
                    />
                </FormController>
                <FormController>
                    <label htmlFor="date_of_birth" className="font-bold">
                        Date of Birth:
                    </label>
                    <input
                        type="date"
                        id="date_of_birth"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 border border-gray-300 focus:bg-green-100"
                    />
                </FormController>
                <FormController>
                    <label htmlFor="website" className="font-bold">
                        Website:
                    </label>
                    <input
                        type="text"
                        id="website"
                        className="w-full p-2 outline-none rounded-md focus:bg-opacity-50 border border-gray-300 focus:bg-green-100"
                        placeholder="Enter author website URL"
                    />
                </FormController>
                <div className="w-full flex flex-row gap-4 justify-between mt-4 pb-1">
                    <Button type="submit">
                        Add
                    </Button>
                    <Button type="button" className="bg-orange-400 hover:bg-orange-600" onClick={()=>{
                        closeModal();
                    }}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AuthorForm;
