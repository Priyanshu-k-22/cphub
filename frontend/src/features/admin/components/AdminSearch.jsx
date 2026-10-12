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
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                px-3
            "
        >

            <Search
                size={13}
                className="text-[var(--theme-text-muted)]"
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
                    text-[var(--theme-text)]
                    outline-none
                    placeholder:text-[#394656]
                "
            />

        </div>

    );
};


export default AdminSearch;