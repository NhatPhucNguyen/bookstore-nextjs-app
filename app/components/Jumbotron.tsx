import Image from "next/image";
import Link from "next/link";
import React from "react";

const Jumbotron = () => {
    return (
        <div className="text-white flex flex-row gap-4 justify-center items-center w-full p-5 rounded-3xl bg-black bg-opacity-25">
            <div className="animate-fade-right">
                <h1 className="font-bold text-3xl">
                    Find your new books in BookFinder
                </h1>
                <p className="mt-5">
                    <Link href={"/books"} className="underline ">
                        Not Sure What To Read Next?
                    </Link>
                    <br></br>Explore our collections of books with the best price !
                </p>
                <Link href={"/books"} type="button" className="block mt-5 bg-secondary p-3 rounded-md font-bold shadow-xl hover:bg-white hover:text-secondary w-fit">Go to collection </Link>
            </div>
            <div className="max-w-xl min-w-28 w-3/5 animate-fade-left">
                <Image
                    src={"/jumbotron-img.jpg"}
                    alt=""
                    width={500}
                    height={500}
                    loading="lazy"
                    className="rounded-lg object-fill min-w-22"
                />
            </div>
        </div>
    );
};

export default Jumbotron;
