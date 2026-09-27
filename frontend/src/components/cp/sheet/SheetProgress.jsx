import React from "react";


const SheetProgress = ({
    solved = 0,
    total = 0
}) => {

    const percentage =
        total > 0
            ? Math.round(
                (solved / total) * 100
            )
            : 0;


    return (

        <section
            className="
                mb-8
                rounded-xl
                border
                border-[#1C2734]
                bg-[#080D14]
                p-5
            "
        >

            <div
                className="
                    mb-3
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            font-mono
                            text-xs
                            uppercase
                            tracking-wider
                            text-[#556275]
                        "
                    >
                        Progress
                    </p>

                    <p
                        className="
                            mt-1
                            text-lg
                            font-semibold
                            text-white
                        "
                    >
                        {solved}
                        <span
                            className="text-[#556275]"
                        >
                            {" / "}
                            {total}
                        </span>

                    </p>

                </div>


                <span
                    className="
                        font-mono
                        text-sm
                        text-[#4AFFC4]
                    "
                >
                    {percentage}%
                </span>

            </div>


            <div
                className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-[#141C26]
                "
            >

                <div
                    className="
                        h-full
                        rounded-full
                        bg-[#4AFFC4]
                        transition-all
                        duration-500
                    "
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

        </section>

    );
};


export default SheetProgress;