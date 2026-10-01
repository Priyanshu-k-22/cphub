import React from "react";

const ProblemSection = ({
    title,
    children,
    className = ""
}) => {
    return (
        <section className={`mt-12 ${className}`}>
            <h2 className="mb-5 text-2xl font-semibold text-[#EDF2F7]">
                {title}
            </h2>

            {children}
        </section>
    );
};

export default ProblemSection;