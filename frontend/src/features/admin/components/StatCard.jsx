import React from "react";


const StatCard = ({
    label,
    value,
    change,
    description,
    icon: Icon
}) => {

    return (

        <div
            className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#080D14]
                px-4
                py-3.5
                transition
                hover:border-[#273544]
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                "
            >

                <p
                    className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-wider
                        text-[#556275]
                    "
                >
                    {label}
                </p>


                {Icon && (

                    <Icon
                        size={14}
                        strokeWidth={1.7}
                        className="text-[#394656]"
                    />

                )}

            </div>


            <div
                className="
                    mt-2
                    flex
                    items-end
                    justify-between
                    gap-2
                "
            >

                <span
                    className="
                        text-xl
                        font-semibold
                        tracking-tight
                        text-[#E8EEF5]
                    "
                >
                    {value}
                </span>


                {change && (

                    <span
                        className="
                            mb-0.5
                            whitespace-nowrap
                            font-mono
                            text-[8px]
                            text-[#4AFFC4]
                        "
                    >
                        {change}
                    </span>

                )}

            </div>


            {description && (

                <p
                    className="
                        mt-1
                        text-[9px]
                        text-[#465364]
                    "
                >
                    {description}
                </p>

            )}

        </div>

    );
};


export default StatCard;