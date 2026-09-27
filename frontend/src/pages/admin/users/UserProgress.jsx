import React from "react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const users = [
    {
        username: "student01",
        cp: 82,
        dsa: 64,
        contests: 12
    },
    {
        username: "student02",
        cp: 71,
        dsa: 48,
        contests: 8
    },
    {
        username: "student03",
        cp: 43,
        dsa: 91,
        contests: 15
    }
];


const UserProgress = () => {

    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="User Progress"
                    description="Monitor CP, DSA and contest progress."
                />


                <div
                    className="
                        grid
                        gap-3
                    "
                >

                    {users.map((user) => (

                        <div
                            key={user.username}
                            className="
                                rounded-xl
                                border
                                border-[#1C2734]
                                bg-[#080D14]
                                px-4
                                py-4
                            "
                        >

                            <div
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span
                                    className="
                                        text-[11px]
                                        font-medium
                                        text-[#DCE4ED]
                                    "
                                >
                                    {user.username}
                                </span>

                                <span
                                    className="
                                        font-mono
                                        text-[8px]
                                        text-[#556275]
                                    "
                                >
                                    {user.contests} contests
                                </span>

                            </div>


                            {[
                                ["CP Sheet", user.cp],
                                ["DSA Sheet", user.dsa]
                            ].map(
                                ([label, value]) => (

                                    <div
                                        key={label}
                                        className="mb-3 last:mb-0"
                                    >

                                        <div
                                            className="
                                                mb-1
                                                flex
                                                justify-between
                                            "
                                        >

                                            <span
                                                className="
                                                    text-[8px]
                                                    text-[#687587]
                                                "
                                            >
                                                {label}
                                            </span>

                                            <span
                                                className="
                                                    font-mono
                                                    text-[8px]
                                                    text-[#556275]
                                                "
                                            >
                                                {value}%
                                            </span>

                                        </div>


                                        <div
                                            className="
                                                h-1
                                                overflow-hidden
                                                rounded-full
                                                bg-[#151E29]
                                            "
                                        >

                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-[#4AFFC4]
                                                "
                                                style={{
                                                    width:
                                                        `${value}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </AdminLayout>

    );
};


export default UserProgress;