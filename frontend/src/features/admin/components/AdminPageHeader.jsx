import React from "react";


const AdminPageHeader = ({
    eyebrow = "Admin Panel",
    title,
    description,
    action,
    actionLabel
}) => {

    return (

        <div
            className="
                mb-5
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-end
                sm:justify-between
            "
        >

            <div>

                <p
                    className="
                        mb-1
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-[#4AFFC4]
                    "
                >
                    {eyebrow}
                </p>


                <h1
                    className="
                        text-xl
                        font-semibold
                        tracking-tight
                        text-[#E8EEF5]
                    "
                >
                    {title}
                </h1>


                {description && (

                    <p
                        className="
                            mt-1
                            text-[11px]
                            text-[#687587]
                        "
                    >
                        {description}
                    </p>

                )}

            </div>


            {action && (

                <button
                    onClick={action}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#4AFFC4]
                        px-3
                        py-2
                        font-mono
                        text-[10px]
                        font-semibold
                        text-[#06100C]
                        transition
                        hover:bg-[#6AFFD0]
                    "
                >
                    + {actionLabel}
                </button>

            )}

        </div>

    );
};


export default AdminPageHeader;