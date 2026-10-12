import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ListEditor = ({
    label,
    values,
    onChange,
    placeholder
}) => {

    const addItem = () => {
        onChange([
            ...values,
            ""
        ]);
    };

    const updateItem = (index, value) => {

        const updated = [...values];

        updated[index] = value;

        onChange(updated);
    };

    const removeItem = (index) => {

        onChange(
            values.filter(
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
                    {label}
                </label>

                <button
                    type="button"
                    onClick={addItem}
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
                    Add
                </button>

            </div>


            <div className="space-y-2">

                {values.map(
                    (value, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                gap-2
                            "
                        >

                            <input
                                value={value}
                                onChange={(e) =>
                                    updateItem(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    placeholder
                                }
                                className="
                                    min-w-0
                                    flex-1
                                    rounded-lg
                                    border
                                    border-[var(--theme-border)]
                                    bg-[var(--theme-surface-raised)]
                                    px-3
                                    py-2
                                    font-mono
                                    text-[11px]
                                    text-[var(--theme-text)]
                                    outline-none
                                    placeholder:text-[var(--theme-text-muted)]
                                    focus:border-[#4AFFC4]/40
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeItem(index)
                                }
                                className="
                                    rounded-lg
                                    px-2
                                    text-[var(--theme-text-muted)]
                                    hover:bg-red-500/5
                                    hover:text-red-400
                                "
                            >
                                <Trash2 size={13} />
                            </button>

                        </div>

                    )
                )}

                {values.length === 0 && (

                    <p
                        className="
                            rounded-lg
                            border
                            border-dashed
                            border-[var(--theme-border)]
                            px-3
                            py-3
                            text-center
                            font-mono
                            text-[9px]
                            text-[var(--theme-text-muted)]
                        "
                    >
                        No {label.toLowerCase()} added
                    </p>

                )}

            </div>

        </div>
    );
};

export default ListEditor;