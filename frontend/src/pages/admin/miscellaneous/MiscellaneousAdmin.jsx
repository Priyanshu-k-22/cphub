import React from "react";

import {
    Edit3,
    Trash2
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const MiscellaneousAdmin = () => {

    const posts = [
        {
            id: 1,
            title: "How DNS actually works",
            date: "28 Sep 2026",
            status: "published"
        },
        {
            id: 2,
            title: "What happens when you type a URL?",
            date: "27 Sep 2026",
            status: "published"
        }
    ];


    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="Miscellaneous"
                    description="Manage daily learn-something-new posts."
                    action={() =>
                        console.log(
                            "Add post"
                        )
                    }
                    actionLabel="Add Post"
                />


                <div
                    className="
                        space-y-2
                    "
                >

                    {posts.map((post) => (

                        <div
                            key={post.id}
                            className="
                                flex
                                items-center
                                gap-4
                                rounded-xl
                                border
                                border-[#1C2734]
                                bg-[#080D14]
                                px-4
                                py-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#10201B]
                                    font-mono
                                    text-[9px]
                                    text-[#4AFFC4]
                                "
                            >
                                {post.id}
                            </div>


                            <div className="min-w-0 flex-1">

                                <p
                                    className="
                                        truncate
                                        text-[11px]
                                        text-[#DCE4ED]
                                    "
                                >
                                    {post.title}
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        font-mono
                                        text-[8px]
                                        text-[#556275]
                                    "
                                >
                                    {post.date}
                                </p>

                            </div>


                            <span
                                className="
                                    hidden
                                    rounded-full
                                    bg-[#4AFFC4]/10
                                    px-2
                                    py-1
                                    font-mono
                                    text-[8px]
                                    text-[#4AFFC4]
                                    sm:block
                                "
                            >
                                {post.status}
                            </span>


                            <div className="flex gap-1">

                                <button className="p-1.5 text-[#556275] hover:text-[#4AFFC4]">
                                    <Edit3 size={13} />
                                </button>

                                <button className="p-1.5 text-[#556275] hover:text-red-400">
                                    <Trash2 size={13} />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </AdminLayout>

    );
};


export default MiscellaneousAdmin;