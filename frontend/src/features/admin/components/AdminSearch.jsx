import React from "react";

import { Search } from "lucide-react";


const AdminSearch = ({
    value,
    onChange,
    placeholder = "Search..."
}) => {

    return (

        <div
            className="
                flex
                h-9
                items-center
                gap-2
                rounded-lg
                border
                border-[#1C2734]
                bg-[#080D14]
                px-3
            "
        >

            <Search
                size={13}
                className="text-[#556275]"
            />

            <input
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className="
                    w-full
                    bg-transparent
                    text-[10px]
                    text-[#DCE4ED]
                    outline-none
                    placeholder:text-[#394656]
                "
            />

        </div>

    );
};


export default AdminSearch;