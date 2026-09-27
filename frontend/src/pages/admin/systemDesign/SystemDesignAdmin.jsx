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


const SystemDesignAdmin = () => {

    const topics = [
        "URL Shortener",
        "Chat Application",
        "Rate Limiter",
        "Notification System",
        "Distributed Cache"
    ];


    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="System Design"
                    description="Manage system design learning resources."
                    action={() =>
                        console.log(
                            "Add system design"
                        )
                    }
                    actionLabel="Add Topic"
                />


                <div
                    className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >

                    {topics.map(
                        (topic, index) => (

                            <div
                                key={topic}
                                className="
                                    rounded-xl
                                    border
                                    border-[#1C2734]
                                    bg-[#080D14]
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        font-mono
                                        text-[9px]
                                        text-[#4AFFC4]
                                    "
                                >
                                    {String(
                                        index + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>


                                <h3
                                    className="
                                        mt-3
                                        text-sm
                                        text-[#DCE4ED]
                                    "
                                >
                                    {topic}
                                </h3>


                                <p
                                    className="
                                        mt-1
                                        text-[9px]
                                        text-[#556275]
                                    "
                                >
                                    System design topic
                                </p>


                                <div
                                    className="
                                        mt-4
                                        flex
                                        justify-end
                                        gap-1
                                    "
                                >

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

                            </div>

                        )
                    )}

                </div>

            </div>

        </AdminLayout>

    );
};


export default SystemDesignAdmin;