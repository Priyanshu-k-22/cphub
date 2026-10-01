import React, {
    useEffect,
    useState
} from "react";

import {
    X
} from "lucide-react";

import ExampleEditor
    from "./ExampleEditor";
import DailyProblemBasicsFields from "./DailyProblemBasicsFields";
import DailyProblemStatementEditor from "./DailyProblemStatementEditor";

import ListEditor
    from "./ListEditor";

import SolutionEditor
    from "./SolutionEditor";


/*
|--------------------------------------------------------------------------
| Initial Solutions
|--------------------------------------------------------------------------
*/

const initialSolutions = {
    brute: {
        intuition: "",
        approach: "",
        code: "",
        timeComplexity: "",
        spaceComplexity: ""
    },

    better: {
        intuition: "",
        approach: "",
        code: "",
        timeComplexity: "",
        spaceComplexity: ""
    },

    optimal: {
        intuition: "",
        approach: "",
        code: "",
        timeComplexity: "",
        spaceComplexity: ""
    },

    cp: {
        intuition: "",
        approach: "",
        code: "",
        timeComplexity: "",
        spaceComplexity: ""
    }
};


/*
|--------------------------------------------------------------------------
| Initial Form
|--------------------------------------------------------------------------
*/

const initialForm = {
    title: "",
    slug: "",
    category: "DSA",
    difficulty: "Easy",
    rating: "",
    dailyDate: "",
    platform: "",
    externalLink: "",
    statement: "",

    examples: [],

    constraints: [],

    tags: [],

    topics: [],

    isPublished: false,

    solutions: initialSolutions
};


/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const AddDailyProblemModal = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    initialProblem = null,
    isEditing = false,
    error = ""
}) => {

    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {
        if (!isOpen) return;

        if (!initialProblem) {
            setForm({
                ...initialForm,
                examples: [],
                constraints: [],
                tags: [],
                topics: [],
                solutions: {
                    brute: { ...initialSolutions.brute },
                    better: { ...initialSolutions.better },
                    optimal: { ...initialSolutions.optimal },
                    cp: { ...initialSolutions.cp }
                }
            });
            return;
        }

        const dailyDate = new Date(initialProblem.dailyDate);
        setForm({
            ...initialForm,
            ...initialProblem,
            dailyDate: Number.isNaN(dailyDate.getTime())
                ? String(initialProblem.dailyDate || "").slice(0, 10)
                : dailyDate.toISOString().slice(0, 10),
            rating: initialProblem.rating ?? "",
            examples: initialProblem.examples || [],
            constraints: initialProblem.constraints || [],
            tags: initialProblem.tags || [],
            topics: initialProblem.topics || [],
            solutions: {
                brute: { ...initialSolutions.brute, ...(initialProblem.brute || {}) },
                better: { ...initialSolutions.better, ...(initialProblem.better || {}) },
                optimal: { ...initialSolutions.optimal, ...(initialProblem.optimal || {}) },
                cp: {
                    intuition: initialProblem.intuition || "",
                    approach: initialProblem.approach || "",
                    code: initialProblem.code || "",
                    timeComplexity: initialProblem.timeComplexity || "",
                    spaceComplexity: initialProblem.spaceComplexity || ""
                }
            }
        });
    }, [initialProblem, isOpen]);


    /*
    |--------------------------------------------------------------------------
    | Don't render
    |--------------------------------------------------------------------------
    */

    if (!isOpen) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | Update Field
    |--------------------------------------------------------------------------
    */

    const updateField = (
        field,
        value
    ) => {

        setForm((prev) => ({
            ...prev,
            [field]: value
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Category Change
    |--------------------------------------------------------------------------
    */

    const handleCategoryChange = (
        category
    ) => {

        setForm((prev) => ({
            ...prev,
            category
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        /*
         * Prepare backend payload.
         */

        const payload = {

            title:
                form.title.trim(),

            slug:
                form.slug.trim(),

            category:
                form.category,

            difficulty:
                form.difficulty,

            ...(form.rating !== "" && {
                rating: Number(form.rating)
            }),

            dailyDate:
                form.dailyDate,

            platform:
                form.platform.trim(),

            externalLink:
                form.externalLink.trim(),

            statement:
                form.statement,

            examples:
                form.examples,

            constraints:
                form.constraints.filter(
                    (item) =>
                        item.trim() !== ""
                ),

            tags:
                form.tags.filter(
                    (item) =>
                        item.trim() !== ""
                ),

            topics:
                form.topics.filter(
                    (item) =>
                        item.trim() !== ""
                ),

            isPublished:
                form.isPublished
        };


        /*
         * DSA solution
         */

        if (form.category === "DSA") {

            payload.brute =
                form.solutions.brute;

            payload.better =
                form.solutions.better;

            payload.optimal =
                form.solutions.optimal;

        }


        /*
         * CP solution
         */

        if (form.category === "CP") {

            payload.intuition =
                form.solutions.cp.intuition;

            payload.approach =
                form.solutions.cp.approach;

            payload.code =
                form.solutions.cp.code;

            payload.timeComplexity =
                form.solutions.cp.timeComplexity;

            payload.spaceComplexity =
                form.solutions.cp.spaceComplexity;

        }


        /*
         * Send to parent.
         */

        await onSubmit(payload);

    };


    /*
    |--------------------------------------------------------------------------
    | JSX
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/75
                px-3
                py-4
                backdrop-blur-sm
            "
            onClick={onClose}
        >

            <div
                className="
                    flex
                    max-h-[94vh]
                    w-full
                    max-w-4xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#1C2734]
                    bg-[#080D14]
                    shadow-2xl
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* =========================================================
                    HEADER
                ========================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-[#1C2734]
                        px-5
                        py-4
                    "
                >

                    <div>

                        <h2
                            className="
                                font-mono
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            {isEditing ? "Edit Daily Problem" : "Add Daily Problem"}
                        </h2>

                        <p
                            className="
                                mt-1
                                font-mono
                                text-[9px]
                                text-[#556275]
                            "
                        >
                            {isEditing ? "Update this daily problem" : "Create and publish a daily problem"}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-lg
                            p-2
                            text-[#556275]
                            transition
                            hover:bg-[#111923]
                            hover:text-white
                            disabled:opacity-50
                        "
                    >
                        <X size={17} />
                    </button>

                </div>


                {/* =========================================================
                    FORM
                ========================================================= */}

                <form
                    id="add-daily-problem-form"
                    onSubmit={handleSubmit}
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        px-5
                        py-5
                    "
                >

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {/* =====================================================
                        BASIC INFORMATION
                    ===================================================== */}

                    <DailyProblemBasicsFields form={form} updateField={updateField} handleCategoryChange={handleCategoryChange} />


                    {/* =====================================================
                        STATEMENT
                    ===================================================== */}

                    <DailyProblemStatementEditor value={form.statement} onChange={(value) => updateField("statement", value)} />


                    {/* =====================================================
                        EXAMPLES
                    ===================================================== */}

                    <Section
                        title="Examples"
                    >

                        <ExampleEditor
                            examples={
                                form.examples
                            }
                            onChange={(value) =>
                                updateField(
                                    "examples",
                                    value
                                )
                            }
                        />

                    </Section>


                    {/* =====================================================
                        METADATA
                    ===================================================== */}

                    <Section
                        title="Metadata"
                    >

                        <div
                            className="
                                space-y-5
                            "
                        >

                            <ListEditor
                                label="Constraints"
                                values={
                                    form.constraints
                                }
                                onChange={(value) =>
                                    updateField(
                                        "constraints",
                                        value
                                    )
                                }
                                placeholder="e.g. 1 <= n <= 10^5"
                            />


                            <ListEditor
                                label="Tags"
                                values={
                                    form.tags
                                }
                                onChange={(value) =>
                                    updateField(
                                        "tags",
                                        value
                                    )
                                }
                                placeholder="e.g. array"
                            />


                            <ListEditor
                                label="Topics"
                                values={
                                    form.topics
                                }
                                onChange={(value) =>
                                    updateField(
                                        "topics",
                                        value
                                    )
                                }
                                placeholder="e.g. dynamic programming"
                            />

                        </div>

                    </Section>


                    {/* =====================================================
                        SOLUTION
                    ===================================================== */}

                    <Section
                        title="Solution"
                    >

                        <SolutionEditor
                            category={
                                form.category
                            }
                            solutions={
                                form.solutions
                            }
                            onChange={(value) =>
                                updateField(
                                    "solutions",
                                    value
                                )
                            }
                        />

                    </Section>

                </form>


                {/* =========================================================
                    FOOTER
                ========================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        justify-end
                        gap-2
                        border-t
                        border-[#1C2734]
                        px-5
                        py-3
                    "
                >

                    {/* CANCEL */}

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-lg
                            border
                            border-[#263342]
                            px-4
                            py-2
                            font-mono
                            text-[10px]
                            text-[#8D9AAF]
                            transition
                            hover:bg-[#111923]
                            hover:text-white
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        form="add-daily-problem-form"
                        disabled={loading}
                        className="
                            rounded-lg
                            bg-[#4AFFC4]
                            px-4
                            py-2
                            font-mono
                            text-[10px]
                            font-semibold
                            text-[#06100D]
                            transition
                            hover:bg-[#63FFD0]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? (isEditing ? "Saving..." : "Creating...")
                            : (isEditing ? "Save Changes" : "Add Problem")
                        }

                    </button>

                </div>

            </div>

        </div>
    );
};


/*
|--------------------------------------------------------------------------
| Section
|--------------------------------------------------------------------------
*/

const Section = ({
    title,
    children
}) => {

    return (

        <section
            className="
                mb-6
                last:mb-0
            "
        >

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
                    {title}
                </p>

            </div>

            {children}

        </section>
    );
};


/*
|--------------------------------------------------------------------------
| Input Class
|--------------------------------------------------------------------------
*/

const inputClass = `
    w-full
    rounded-lg
    border
    border-[#1C2734]
    bg-[#0C131C]
    px-3
    py-2.5
    font-mono
    text-[10px]
    text-white
    outline-none
    placeholder:text-[#455264]
    focus:border-[#4AFFC4]/40
`;


export default AddDailyProblemModal;
