import { Edit3, Trash2 } from "lucide-react";

const CPSheetProblemTable = ({ loading, problems, rating, onEdit, onDelete }) => (
<div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    {/* TABLE HEADER */}

                    <div
                        className="
                            border-b
                            border-[#1C2734]
                            px-4
                            py-3
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        font-mono
                                        text-[9px]
                                        uppercase
                                        text-[#4AFFC4]
                                    "
                                >

                                    Rating {rating}

                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-[#556275]
                                    "
                                >

                                    50 problems maximum

                                </p>

                            </div>


                            <span
                                className="
                                    font-mono
                                    text-[9px]
                                    text-[#556275]
                                "
                            >

                                {problems.length} / 50

                            </span>

                        </div>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div
                            className="
                                px-4
                                py-12
                                text-center
                            "
                        >

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    text-[#556275]
                                "
                            >

                                Loading problems...

                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                overflow-x-auto
                            "
                        >

                            <table
                                className="
                                    w-full
                                    min-w-[650px]
                                    text-left
                                "
                            >

                                <thead>

                                    <tr
                                        className="
                                            border-b
                                            border-[#1C2734]
                                            font-mono
                                            text-[8px]
                                            uppercase
                                            tracking-wider
                                            text-[#556275]
                                        "
                                    >

                                        <th className="px-4 py-3">
                                            #
                                        </th>

                                        <th className="px-4 py-3">
                                            Problem
                                        </th>

                                        <th className="px-4 py-3">
                                            Codeforces ID
                                        </th>

                                        <th className="px-4 py-3">
                                            Rating
                                        </th>

                                        <th className="px-4 py-3">
                                            Hint
                                        </th>

                                        <th className="px-4 py-3 text-right">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {problems.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="
                                                    px-4
                                                    py-12
                                                    text-center
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-mono
                                                        text-[10px]
                                                        text-[#556275]
                                                    "
                                                >

                                                    No problems found
                                                    for rating {rating}.

                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        problems.map(
                                            (problem, index) => (

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

                                                    {/* ORDER */}

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
                                                            problem.order ||
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}

                                                    </td>


                                                    {/* TITLE */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-[11px]
                                                            text-[#DCE4ED]
                                                        "
                                                    >

                                                        {
                                                            problem.title
                                                        }

                                                    </td>


                                                    {/* CODEFORCES ID */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-3
                                                            font-mono
                                                            text-[10px]
                                                            text-[#4AFFC4]
                                                        "
                                                    >

                                                        {
                                                            problem.codeforcesId
                                                        }

                                                    </td>


                                                    {/* RATING */}

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
                                                            problem.rating
                                                        }

                                                    </td>


                                                    {/* HINT */}

                                                    <td
                                                        className="
                                                            max-w-[220px]
                                                            px-4
                                                            py-3
                                                            text-[9px]
                                                            text-[#7F8B9C]
                                                        "
                                                    >

                                                        {problem.hint
                                                            ? (
                                                                <span
                                                                    title={
                                                                        problem.hint
                                                                    }
                                                                >
                                                                    {
                                                                        problem.hint
                                                                    }
                                                                </span>
                                                            )
                                                            : (
                                                                <span
                                                                    className="
                                                                        text-[#465364]
                                                                    "
                                                                >
                                                                    —
                                                                </span>
                                                            )
                                                        }

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
                                                                onClick={() => onDelete(problem)}
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

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>
);

export default CPSheetProblemTable;
