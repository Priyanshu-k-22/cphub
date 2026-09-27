import React, {
    useState
} from "react";

import {
    Edit3,
    Trash2,
    ExternalLink
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";

import AdminSearch
    from "../components/AdminSearch";


const CTCAdmin = () => {

    const [search, setSearch] =
        useState("");


    const resources = [
        {
            id: 1,
            title: "Git & GitHub",
            type: "Tool",
            status: "active"
        },
        {
            id: 2,
            title: "Linux Basics",
            type: "Foundation",
            status: "active"
        },
        {
            id: 3,
            title: "Understanding CTC",
            type: "Career",
            status: "active"
        }
    ];


    const filtered =
        resources.filter((item) =>
            item.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );


    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="CTC / Must Know"
                    description="Manage foundational tools and career resources."
                    action={() =>
                        console.log(
                            "Add resource"
                        )
                    }
                    actionLabel="Add Resource"
                />


                <div className="mb-4 max-w-sm">

                    <AdminSearch
                        value={search}
                        onChange={setSearch}
                        placeholder="Search resources..."
                    />

                </div>


                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    <table className="w-full text-left">

                        <thead>

                            <tr
                                className="
                                    border-b
                                    border-[#1C2734]
                                    font-mono
                                    text-[8px]
                                    uppercase
                                    text-[#556275]
                                "
                            >

                                <th className="px-4 py-3">
                                    #
                                </th>

                                <th className="px-4 py-3">
                                    Resource
                                </th>

                                <th className="px-4 py-3">
                                    Type
                                </th>

                                <th className="px-4 py-3">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filtered.map(
                                (item) => (

                                    <tr
                                        key={item.id}
                                        className="
                                            border-b
                                            border-[#1C2734]/60
                                            last:border-0
                                        "
                                    >

                                        <td
                                            className="
                                                px-4
                                                py-3
                                                font-mono
                                                text-[9px]
                                                text-[#465364]
                                            "
                                        >
                                            {item.id}
                                        </td>


                                        <td
                                            className="
                                                px-4
                                                py-3
                                                text-[11px]
                                                text-[#DCE4ED]
                                            "
                                        >
                                            {item.title}
                                        </td>


                                        <td
                                            className="
                                                px-4
                                                py-3
                                                text-[9px]
                                                text-[#7F8B9C]
                                            "
                                        >
                                            {item.type}
                                        </td>


                                        <td className="px-4 py-3">

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-[#4AFFC4]/10
                                                    px-2
                                                    py-1
                                                    font-mono
                                                    text-[8px]
                                                    text-[#4AFFC4]
                                                "
                                            >
                                                ACTIVE
                                            </span>

                                        </td>


                                        <td className="px-4 py-3">

                                            <div className="flex justify-end gap-1">

                                                <button className="p-1.5 text-[#556275] hover:text-[#4AFFC4]">
                                                    <Edit3 size={13} />
                                                </button>

                                                <button className="p-1.5 text-[#556275] hover:text-red-400">
                                                    <Trash2 size={13} />
                                                </button>

                                                <button className="p-1.5 text-[#556275] hover:text-[#E8EEF5]">
                                                    <ExternalLink size={13} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );
};


export default CTCAdmin;