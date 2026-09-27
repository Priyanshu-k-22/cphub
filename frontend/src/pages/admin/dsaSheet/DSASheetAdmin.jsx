import React, {
    useState
} from "react";

import {
    Edit3,
    Trash2
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const categories = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "Trees",
    "Recursion",
    "Backtracking",
    "DP"
];


const DSASheetAdmin = () => {

    const [category, setCategory] =
        useState("Arrays");


    const problems = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy"
        },
        {
            id: 2,
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy"
        },
        {
            id: 3,
            title: "Maximum Subarray",
            difficulty: "Medium"
        }
    ];


    return (

        <AdminLayout>

            <div
                className="
                    px-4
                    py-5
                    sm:px-5
                    lg:px-7
                "
            >

                <AdminPageHeader
                    title="DSA Sheet"
                    description="Manage problems organized by DSA topic."
                    action={() =>
                        console.log(
                            "Add DSA problem"
                        )
                    }
                    actionLabel="Add Problem"
                />


                {/* CATEGORY TABS */}

                <div
                    className="
                        mb-4
                        flex
                        gap-1.5
                        overflow-x-auto
                        pb-1
                    "
                >

                    {categories.map(
                        (item) => (

                            <button
                                key={item}
                                onClick={() =>
                                    setCategory(item)
                                }
                                className={`
                                    shrink-0
                                    rounded-lg
                                    border
                                    px-3
                                    py-2
                                    text-[9px]
                                    transition
                                    ${
                                        category === item
                                            ? `
                                                border-[#4AFFC4]/30
                                                bg-[#4AFFC4]/10
                                                text-[#4AFFC4]
                                              `
                                            : `
                                                border-[#1C2734]
                                                bg-[#080D14]
                                                text-[#556275]
                                              `
                                    }
                                `}
                            >
                                {item}
                            </button>

                        )
                    )}

                </div>


                {/* TABLE */}

                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    <div
                        className="
                            border-b
                            border-[#1C2734]
                            px-4
                            py-3
                        "
                    >

                        <p
                            className="
                                font-mono
                                text-[9px]
                                uppercase
                                text-[#4AFFC4]
                            "
                        >
                            {category}
                        </p>

                    </div>


                    <div className="overflow-x-auto">

                        <table
                            className="
                                w-full
                                min-w-[600px]
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
                                        #
                                    </th>

                                    <th className="px-4 py-3">
                                        Problem
                                    </th>

                                    <th className="px-4 py-3">
                                        Difficulty
                                    </th>

                                    <th className="px-4 py-3 text-right">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {problems.map(
                                    (problem) => (

                                        <tr
                                            key={problem.id}
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
                                                {problem.id}
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                    text-[11px]
                                                    text-[#DCE4ED]
                                                "
                                            >
                                                {
                                                    problem.title
                                                }
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                    text-[9px]
                                                    text-[#7F8B9C]
                                                "
                                            >
                                                {
                                                    problem.difficulty
                                                }
                                            </td>


                                            <td
                                                className="
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        justify-end
                                                        gap-1
                                                    "
                                                >

                                                    <button
                                                        className="
                                                            rounded
                                                            p-1.5
                                                            text-[#556275]
                                                            hover:text-[#4AFFC4]
                                                        "
                                                    >
                                                        <Edit3
                                                            size={13}
                                                        />
                                                    </button>

                                                    <button
                                                        className="
                                                            rounded
                                                            p-1.5
                                                            text-[#556275]
                                                            hover:text-red-400
                                                        "
                                                    >
                                                        <Trash2
                                                            size={13}
                                                        />
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


export default DSASheetAdmin;