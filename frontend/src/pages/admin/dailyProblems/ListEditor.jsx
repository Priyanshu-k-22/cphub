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
                        text-[#8D9AAF]
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
                        text-[#4AFFC4]
                        hover:text-white
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
                                    border-[#1C2734]
                                    bg-[#0C131C]
                                    px-3
                                    py-2
                                    font-mono
                                    text-[11px]
                                    text-white
                                    outline-none
                                    placeholder:text-[#455264]
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
                                    text-[#556275]
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
                            border-[#1C2734]
                            px-3
                            py-3
                            text-center
                            font-mono
                            text-[9px]
                            text-[#455264]
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