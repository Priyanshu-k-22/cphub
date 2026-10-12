import React from "react";
import {
    Plus,
    Trash2
} from "lucide-react";

const ExampleEditor = ({
    examples,
    onChange
}) => {

    const addExample = () => {

        onChange([
            ...examples,
            {
                input: "",
                output: "",
                explanation: ""
            }
        ]);

    };


    const updateExample = (
        index,
        field,
        value
    ) => {

        const updated = [...examples];

        updated[index] = {
            ...updated[index],
            [field]: value
        };

        onChange(updated);
    };


    const removeExample = (index) => {

        onChange(
            examples.filter(
                (_, i) => i !== index
            )
        );

    };


    return (

        <div>

            <div
                className="
                    mb-2
                    flex
                    items-center
                    justify-between
                "
            >

                <label
                    className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-[var(--theme-text-secondary)]
                    "
                >
                    Examples
                </label>

                <button
                    type="button"
                    onClick={addExample}
                    className="
                        flex
                        items-center
                        gap-1
                        font-mono
                        text-[9px]
                        text-[var(--theme-accent)]
                        hover:text-[var(--theme-text)]
                    "
                >
                    <Plus size={12} />
                    Add Example
                </button>

            </div>


            <div className="space-y-3">

                {examples.map(
                    (example, index) => (

                        <div
                            key={index}
                            className="
                                rounded-xl
                                border
                                border-[var(--theme-border)]
                                bg-[var(--theme-surface-raised)]
                                p-3
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

                                <span
                                    className="
                                        font-mono
                                        text-[9px]
                                        text-[var(--theme-text-muted)]
                                    "
                                >
                                    Example {index + 1}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeExample(index)
                                    }
                                    className="
                                        text-[var(--theme-text-muted)]
                                        hover:text-red-400
                                    "
                                >
                                    <Trash2 size={13} />
                                </button>

                            </div>


                            <div
                                className="
                                    grid
                                    gap-3
                                    md:grid-cols-2
                                "
                            >

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
                                        Input
                                    </label>

                                    <textarea
                                        value={
                                            example.input
                                        }
                                        onChange={(e) =>
                                            updateExample(
                                                index,
                                                "input",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        placeholder="Example input"
                                        className="
                                            w-full
                                            resize-none
                                            rounded-lg
                                            border
                                            border-[var(--theme-border)]
                                            bg-[var(--theme-surface-raised)]
                                            px-3
                                            py-2
                                            font-mono
                                            text-[10px]
                                            text-[var(--theme-text)]
                                            outline-none
                                            placeholder:text-[var(--theme-text-muted)]
                                            focus:border-[#4AFFC4]/40
                                        "
                                    />

                                </div>


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
                                        Output
                                    </label>

                                    <textarea
                                        value={
                                            example.output
                                        }
                                        onChange={(e) =>
                                            updateExample(
                                                index,
                                                "output",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        placeholder="Example output"
                                        className="
                                            w-full
                                            resize-none
                                            rounded-lg
                                            border
                                            border-[var(--theme-border)]
                                            bg-[var(--theme-surface-raised)]
                                            px-3
                                            py-2
                                            font-mono
                                            text-[10px]
                                            text-[var(--theme-text)]
                                            outline-none
                                            placeholder:text-[var(--theme-text-muted)]
                                            focus:border-[#4AFFC4]/40
                                        "
                                    />

                                </div>

                            </div>


                            <div className="mt-3">

                                <label
                                    className="
                                        mb-1
                                        block
                                        font-mono
                                        text-[9px]
                                        text-[#66758A]
                                    "
                                >
                                    Explanation
                                </label>

                                <textarea
                                    value={
                                        example.explanation
                                    }
                                    onChange={(e) =>
                                        updateExample(
                                            index,
                                            "explanation",
                                            e.target.value
                                        )
                                    }
                                    rows={2}
                                    placeholder="Explain the example"
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-[var(--theme-border)]
                                        bg-[var(--theme-surface-raised)]
                                        px-3
                                        py-2
                                        font-mono
                                        text-[10px]
                                        text-[var(--theme-text)]
                                        outline-none
                                        placeholder:text-[var(--theme-text-muted)]
                                        focus:border-[#4AFFC4]/40
                                    "
                                />

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};

export default ExampleEditor;