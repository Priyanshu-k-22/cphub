import React from "react";

import {
    Bell,
    Menu,
    Search
} from "lucide-react";


const AdminTopbar = () => {

    return (

        <header
            className="
                flex
                h-[60px]
                shrink-0
                items-center
                border-b
                border-[#1C2734]
                bg-[#070B11]
                px-4
                sm:px-5
                lg:px-7
            "
        >

            {/* MOBILE MENU */}

            <button
                className="
                    rounded-lg
                    p-2
                    text-[#687587]
                    hover:bg-[#0D151F]
                    hover:text-white
                    lg:hidden
                "
            >

                <Menu size={18} />

            </button>


            {/* SEARCH */}

            <div
                className="
                    ml-2
                    hidden
                    w-[280px]
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-[#1C2734]
                    bg-[#080D14]
                    px-3
                    py-2
                    md:flex
                    lg:ml-0
                "
            >

                <Search
                    size={14}
                    className="text-[#556275]"
                />

                <input
                    type="text"
                    placeholder="Search users, problems..."
                    className="
                        w-full
                        bg-transparent
                        text-[10px]
                        text-[#DCE4ED]
                        outline-none
                        placeholder:text-[#394656]
                    "
                />

                <span
                    className="
                        rounded
                        border
                        border-[#1C2734]
                        px-1.5
                        py-0.5
                        font-mono
                        text-[7px]
                        text-[#465364]
                    "
                >
                    /
                </span>

            </div>


            <div className="ml-auto flex items-center gap-2">


                {/* NOTIFICATIONS */}

                <button
                    className="
                        relative
                        rounded-lg
                        p-2
                        text-[#687587]
                        transition
                        hover:bg-[#0D151F]
                        hover:text-[#E8EEF5]
                    "
                >

                    <Bell size={15} />

                    <span
                        className="
                            absolute
                            right-1.5
                            top-1.5
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[#4AFFC4]
                        "
                    />

                </button>


                {/* ADMIN */}

                <div
                    className="
                        flex
                        items-center
                        gap-2.5
                        border-l
                        border-[#1C2734]
                        pl-3
                    "
                >

                    <div
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-[#14221E]
                            font-mono
                            text-[10px]
                            font-semibold
                            text-[#4AFFC4]
                        "
                    >
                        A
                    </div>


                    <div className="hidden sm:block">

                        <p
                            className="
                                text-[11px]
                                font-medium
                                text-[#DCE4ED]
                            "
                        >
                            Admin
                        </p>

                        <p
                            className="
                                font-mono
                                text-[8px]
                                text-[#556275]
                            "
                        >
                            Administrator
                        </p>

                    </div>

                </div>

            </div>

        </header>

    );
};


export default AdminTopbar;