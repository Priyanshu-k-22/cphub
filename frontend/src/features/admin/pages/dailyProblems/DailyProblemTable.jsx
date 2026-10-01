import DailyProblemRow from "./DailyProblemRow.jsx";

const DailyProblemTable = ({ filteredProblems, loading, page, pageSize, onEdit, onDelete }) => (
<div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    <div
                        className="
                            overflow-x-auto
                        "
                    >

                        <table
                            className="
                                w-full
                                min-w-[800px]
                                text-left
                            "
                        >

                            {/* TABLE HEADER */}

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

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        #
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Problem
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Category
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Difficulty
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Platform
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Date
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Status
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                            text-right
                                        "
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            {/* TABLE BODY */}

                            <tbody>

                                {filteredProblems.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
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
                                                {loading ? "Loading problems..." : "No daily problems found."}
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredProblems.map(
                                        (problem, index) => (

                                            <DailyProblemRow key={problem._id} problem={problem} index={index} page={page} pageSize={pageSize} onEdit={onEdit} onDelete={onDelete} />

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
);

export default DailyProblemTable;
