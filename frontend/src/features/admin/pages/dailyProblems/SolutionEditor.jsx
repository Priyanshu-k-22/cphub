import React from "react";

const Input = ({
    label,
    value,
    onChange,
    textarea = false,
    rows = 3,
    placeholder
}) => {

    const className = `
        w-full
        rounded-lg
        border
        border-[#1C2734]
        bg-[#0C131C]
        px-3
        py-2
        font-mono
        text-[10px]
        text-white
        outline-none
        placeholder:text-[#455264]
        focus:border-[#4AFFC4]/40
    `;

    return (

        <div>

            <label
                className="
                    mb-1
                    block
                    font-mono
                    text-[9px]
                    text-[#66758A]
                "
            >
                {label}
            </label>

            {textarea ? (

                <textarea
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    rows={rows}
                    placeholder={placeholder}
                    className={`${className} resize-none`}
                />

            ) : (

                <input
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder={placeholder}
                    className={className}
                />

            )}

        </div>
    );
};


const SolutionEditor = ({
    category,
    solutions,
    onChange
}) => {

    const update = (
        section,
        field,
        value
    ) => {

        onChange({
            ...solutions,
            [section]: {
                ...solutions[section],
                [field]: value
            }
        });

    };


    const updateCP = (
        field,
        value
    ) => {

        onChange({
            ...solutions,
            cp: {
                ...solutions.cp,
                [field]: value
            }
        });

    };


    if (category === "CP") {

        return (

            <div>

                <SectionTitle>
                    CP Solution
                </SectionTitle>

                <div className="space-y-3">

                    <Input
                        label="Intuition"
                        textarea
                        rows={3}
                        value={
                            solutions.cp.intuition
                        }
                        onChange={(value) =>
                            updateCP(
                                "intuition",
                                value
                            )
                        }
                    />

                    <Input
                        label="Approach"
                        textarea
                        rows={4}
                        value={
                            solutions.cp.approach
                        }
                        onChange={(value) =>
                            updateCP(
                                "approach",
                                value
                            )
                        }
                    />

                    <Input
                        label="Code"
                        textarea
                        rows={8}
                        value={
                            solutions.cp.code
                        }
                        onChange={(value) =>
                            updateCP(
                                "code",
                                value
                            )
                        }
                    />

                    <div
                        className="
                            grid
                            gap-3
                            md:grid-cols-2
                        "
                    >

                        <Input
                            label="Time Complexity"
                            value={
                                solutions.cp.timeComplexity
                            }
                            onChange={(value) =>
                                updateCP(
                                    "timeComplexity",
                                    value
                                )
                            }
                            placeholder="O(n)"
                        />

                        <Input
                            label="Space Complexity"
                            value={
                                solutions.cp.spaceComplexity
                            }
                            onChange={(value) =>
                                updateCP(
                                    "spaceComplexity",
                                    value
                                )
                            }
                            placeholder="O(1)"
                        />

                    </div>

                </div>

            </div>
        );
    }


    return (

        <div>

            <SectionTitle>
                DSA Solutions
            </SectionTitle>

            <div className="space-y-4">

                {[
                    ["brute", "Brute Solution"],
                    ["better", "Better Solution"],
                    ["optimal", "Optimal Solution"]
                ].map(
                    ([key, title]) => (

                        <div
                            key={key}
                            className="
                                rounded-xl
                                border
                                border-[#1C2734]
                                bg-[#0A1018]
                                p-3
                            "
                        >

                            <p
                                className="
                                    mb-3
                                    font-mono
                                    text-[10px]
                                    font-semibold
                                    text-[#4AFFC4]
                                "
                            >
                                {title}
                            </p>

                            <div className="space-y-3">

                                <Input
                                    label="Intuition"
                                    textarea
                                    value={
                                        solutions[key]
                                            .intuition
                                    }
                                    onChange={(value) =>
                                        update(
                                            key,
                                            "intuition",
                                            value
                                        )
                                    }
                                />

                                <Input
                                    label="Approach"
                                    textarea
                                    value={
                                        solutions[key]
                                            .approach
                                    }
                                    onChange={(value) =>
                                        update(
                                            key,
                                            "approach",
                                            value
                                        )
                                    }
                                />

                                <Input
                                    label="Code"
                                    textarea
                                    rows={7}
                                    value={
                                        solutions[key]
                                            .code
                                    }
                                    onChange={(value) =>
                                        update(
                                            key,
                                            "code",
                                            value
                                        )
                                    }
                                />

                                <div
                                    className="
                                        grid
                                        gap-3
                                        md:grid-cols-2
                                    "
                                >

                                    <Input
                                        label="Time Complexity"
                                        value={
                                            solutions[key]
                                                .timeComplexity
                                        }
                                        onChange={(value) =>
                                            update(
                                                key,
                                                "timeComplexity",
                                                value
                                            )
                                        }
                                    />

                                    <Input
                                        label="Space Complexity"
                                        value={
                                            solutions[key]
                                                .spaceComplexity
                                        }
                                        onChange={(value) =>
                                            update(
                                                key,
                                                "spaceComplexity",
                                                value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};


const SectionTitle = ({
    children
}) => (

    <div
        className="
            mb-3
            border-b
            border-[#1C2734]
            pb-2
        "
    >

        <p
            className="
                font-mono
                text-[10px]
                uppercase
                tracking-wider
                text-[#4AFFC4]
            "
        >
            {children}
        </p>

    </div>
);


export default SolutionEditor;