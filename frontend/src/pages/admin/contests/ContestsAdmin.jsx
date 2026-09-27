import React from "react";

import {
    Edit3,
    Trash2,
    ExternalLink
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";

import StatusBadge
    from "../components/StatusBadge";


const contests = [
    {
        id: 1,
        name: "Codeforces Round",
        platform: "Codeforces",
        category: "CP",
        date: "28 Sep 2026",
        status: "active"
    },
    {
        id: 2,
        name: "Starters",
        platform: "CodeChef",
        category: "CP",
        date: "30 Sep 2026",
        status: "active"
    },
    {
        id: 3,
        name: "Weekly Contest",
        platform: "LeetCode",
        category: "DSA",
        date: "04 Oct 2026",
        status: "active"
    }
];


const ContestsAdmin = () => {

    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="Contests"
                    description="Manage upcoming and scheduled contests."
                    action={() =>
                        console.log(
                            "Add contest"
                        )
                    }
                    actionLabel="Add Contest"
                />


                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    <div className="overflow-x-auto">

                        <table
                            className="
                                w-full
                                min-w-[700px]
                                text-left
                            "
                        >

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
                                        Contest
                                    </th>

                                    <th className="px-4 py-3">
                                        Platform
                                    </th>

                                    <th className="px-4 py-3">
                                        Category
                                    </th>

                                    <th className="px-4 py-3">
                                        Date
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

                                {contests.map(
                                    (contest) => (

                                        <tr
                                            key={contest.id}
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
                                                    text-[11px]
                                                    text-[#DCE4ED]
                                                "
                                            >
                                                {contest.name}
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                    text-[9px]
                                                    text-[#7F8B9C]
                                                "
                                            >
                                                {contest.platform}
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                    font-mono
                                                    text-[9px]
                                                    text-[#7F8B9C]
                                                "
                                            >
                                                {contest.category}
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                    font-mono
                                                    text-[9px]
                                                    text-[#556275]
                                                "
                                            >
                                                {contest.date}
                                            </td>


                                            <td className="px-4 py-3">

                                                <StatusBadge
                                                    status={
                                                        contest.status
                                                    }
                                                />

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

            </div>

        </AdminLayout>

    );
};


export default ContestsAdmin;