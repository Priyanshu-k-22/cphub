import React from "react";

import {
    Edit3,
    Trash2,
    Eye
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const InterviewAdmin = () => {

    const blogs = [
        {
            id: 1,
            title: "My Google Interview Experience",
            author: "Student",
            status: "published"
        },
        {
            id: 2,
            title: "Amazon SDE Interview",
            author: "Student",
            status: "draft"
        }
    ];


    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="Interview Blogs"
                    description="Manage interview experiences and career blogs."
                    action={() =>
                        console.log(
                            "Add blog"
                        )
                    }
                    actionLabel="Add Blog"
                />


                <div
                    className="
                        grid
                        gap-3
                        md:grid-cols-2
                    "
                >

                    {blogs.map((blog) => (

                        <div
                            key={blog.id}
                            className="
                                rounded-xl
                                border
                                border-[#1C2734]
                                bg-[#080D14]
                                p-4
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p
                                        className="
                                            font-mono
                                            text-[8px]
                                            uppercase
                                            text-[#4AFFC4]
                                        "
                                    >
                                        Interview Experience
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            text-sm
                                            font-medium
                                            text-[#DCE4ED]
                                        "
                                    >
                                        {blog.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-[9px]
                                            text-[#556275]
                                        "
                                    >
                                        By {blog.author}
                                    </p>

                                </div>


                                <span
                                    className={`
                                        rounded-full
                                        px-2
                                        py-1
                                        font-mono
                                        text-[8px]
                                        ${
                                            blog.status ===
                                            "published"
                                                ? "bg-[#4AFFC4]/10 text-[#4AFFC4]"
                                                : "bg-yellow-400/10 text-yellow-400"
                                        }
                                    `}
                                >
                                    {blog.status}
                                </span>

                            </div>


                            <div
                                className="
                                    mt-4
                                    flex
                                    justify-end
                                    gap-1
                                "
                            >

                                <button className="rounded p-1.5 text-[#556275] hover:text-[#E8EEF5]">
                                    <Eye size={13} />
                                </button>

                                <button className="rounded p-1.5 text-[#556275] hover:text-[#4AFFC4]">
                                    <Edit3 size={13} />
                                </button>

                                <button className="rounded p-1.5 text-[#556275] hover:text-red-400">
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


export default InterviewAdmin;