import { Edit3, Trash2 } from "lucide-react";

const DailyProblemRow = ({ problem, index, page, pageSize, onEdit, onDelete }) => (
<tr
                                                key={
                                                    problem._id
                                                }
                                                className="
                                                    border-b
                                                    border-[#1C2734]/60
                                                    last:border-0
                                                    hover:bg-[#0B1119]
                                                "
                                            >

                                                {/* NUMBER */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#465364]
                                                    "
                                                >
                                                    {String(
                                                    (page - 1) * pageSize + index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </td>


                                                {/* PROBLEM */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-[11px]
                                                                text-[#DCE4ED]
                                                            "
                                                        >
                                                            {
                                                                problem.title
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-0.5
                                                                font-mono
                                                                text-[8px]
                                                                text-[#556275]
                                                            "
                                                        >
                                                            Rating{" "}
                                                            {
                                                                problem.rating ??
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                </td>


                                                {/* CATEGORY */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            rounded-md
                                                            border
                                                            border-[#1C2734]
                                                            bg-[#0D151F]
                                                            px-2
                                                            py-1
                                                            font-mono
                                                            text-[8px]
                                                            text-[#7F8B9C]
                                                        "
                                                    >
                                                        {
                                                            problem.category
                                                        }
                                                    </span>

                                                </td>


                                                {/* DIFFICULTY */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            ${
                                                                problem.difficulty ===
                                                                "Easy"
                                                                    ? "text-[#4AFFC4]"
                                                                    : problem.difficulty ===
                                                                      "Medium"
                                                                    ? "text-yellow-400"
                                                                    : "text-red-400"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            problem.difficulty
                                                        }
                                                    </span>

                                                </td>


                                                {/* PLATFORM */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#7F8B9C]
                                                    "
                                                >
                                                    {
                                                        problem.platform
                                                    }
                                                </td>


                                                {/* DATE */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#7F8B9C]
                                                    "
                                                >
                                                    {
                                                        problem.dailyDate
                                                    }
                                                </td>


                                                {/* STATUS */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            rounded-md
                                                            px-2
                                                            py-1
                                                            font-mono
                                                            text-[8px]

                                                            ${
                                                                problem.isPublished
                                                                    ? `
                                                                        bg-[#4AFFC4]/10
                                                                        text-[#4AFFC4]
                                                                    `
                                                                    : `
                                                                        bg-yellow-400/10
                                                                        text-yellow-400
                                                                    `
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            problem.isPublished
                                                                ? "Published"
                                                                : "Draft"
                                                        }
                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            justify-end
                                                            gap-1
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSubmitError("");
                                                                onEdit(problem);
                                                            }}
                                                            aria-label={`Edit ${problem.title}`}
                                                            className="
                                                                rounded
                                                                p-1.5
                                                                text-[#556275]
                                                                hover:bg-[#0D151F]
                                                                hover:text-[#4AFFC4]
                                                            "
                                                        >

                                                            <Edit3
                                                                size={13}
                                                            />

                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(problem)
                                                            }
                                                            aria-label={`Delete ${problem.title}`}
                                                            className="
                                                                rounded
                                                                p-1.5
                                                                text-[#556275]
                                                                hover:bg-red-500/5
                                                                hover:text-red-400
                                                            "
                                                        >

                                                            <Trash2
                                                                size={13}
                                                            />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
);

export default DailyProblemRow;
