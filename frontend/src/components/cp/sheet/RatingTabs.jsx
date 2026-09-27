import React from "react";


const RatingTabs = ({
    ratings,
    selectedRating,
    onRatingChange
}) => {

    return (

        <div
            className="
                mb-6
                overflow-x-auto
                rounded-xl
                border
                border-[#1C2734]
                bg-[#080D14]
                p-1
            "
        >

            <div
                className="
                    flex
                    min-w-max
                    gap-1
                "
            >

                {ratings.map(
                    (rating) => {

                        const active =
                            rating === selectedRating;


                        return (

                            <button
                                key={rating}
                                type="button"
                                onClick={() =>
                                    onRatingChange(
                                        rating
                                    )
                                }
                                className={`
                                    rounded-lg
                                    px-5
                                    py-2.5
                                    font-mono
                                    text-sm
                                    transition-all
                                    duration-200

                                    ${
                                        active
                                            ? `
                                                bg-[#4AFFC4]
                                                text-[#060A10]
                                                font-semibold
                                              `
                                            : `
                                                text-[#7F8B9C]
                                                hover:bg-[#111923]
                                                hover:text-white
                                              `
                                    }
                                `}
                            >
                                {rating}

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );
};


export default RatingTabs;