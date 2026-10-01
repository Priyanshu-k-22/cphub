import React, {
    useEffect,
    useState
} from "react";

import {
    BookOpen,
    Code2,
    Terminal,
    X
} from "lucide-react";
import AdminFeedback from "../../components/AdminFeedback";


const ratings = [
    800,
    900,
    1000,
    1100,
    1200
];


const AddProblemModal = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    initialProblem = null,
    isEditing = false,
    error = "",
    onErrorDismiss,
    defaultRating = 800
}) => {

    const [form, setForm] = useState({
        title: "",
        codeforcesId: "",
        rating: defaultRating,
        order: "",
        hint: "",
        solution: "",
        code: ""
    });
    const [validationError, setValidationError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | Reset form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (isOpen) {

            setForm({
                title: initialProblem?.title || "",
                codeforcesId: initialProblem?.codeforcesId || "",
                rating: initialProblem?.rating || defaultRating,
                order: initialProblem?.order ?? "",
                hint: initialProblem?.hint || "",
                solution: initialProblem?.solution || "",
                code: initialProblem?.code || ""
            });

        }

    }, [defaultRating, initialProblem, isOpen]);


    if (!isOpen) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | Input change
    |--------------------------------------------------------------------------
    */

    const handleChange = (
        e
    ) => {

        const {
            name,
            value
        } = e.target;

        setForm(
            (prev) => ({
                ...prev,
                [name]: value
            })
        );
        setValidationError("");

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (
        e
    ) => {

        e.preventDefault();


        if (
            !form.title.trim() ||
            !form.codeforcesId.trim() ||
            !form.order
        ) {

            setValidationError("Add a title, Codeforces problem ID, and order before saving.");

            return;

        }


        onSubmit({
            title:
                form.title.trim(),

            codeforcesId:
                form.codeforcesId.trim(),

            rating:
                Number(form.rating),

            order:
                Number(form.order),

            hint:
                form.hint.trim(),

            solution:
                form.solution.trim(),

            code:
                form.code
        });

    };


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
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }

            }}
        >

            <div
                className="
                    flex
                    w-full
                    max-w-3xl
                    max-h-[94vh]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--theme-border)]
                    bg-[var(--theme-surface)]
                    shadow-2xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        shrink-0
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[var(--theme-border)]
                        px-5
                        sm:px-7
                        py-4
                    "
                >

                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Code2 size={20} /></span>
                        <div>

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-[var(--theme-text)]
                            "
                        >
                            {isEditing ? "Edit CP Problem" : "Add CP Problem"}
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-[var(--theme-text-muted)]
                            "
                        >
                            {isEditing ? "Update the CP sheet problem" : "Add a problem to the CP sheet"}
                        </p>

                        </div>
                    </div>


                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="
                        rounded-xl
                        p-2
                        text-[var(--theme-text-muted)]
                        transition
                        hover:bg-[var(--theme-surface-high)]
                            hover:text-[var(--theme-text)]
                        "
                    >

                        <X
                            size={16}
                        />

                    </button>

                </div>


                {/* FORM */}

                <form
                    id="add-cp-problem-form"
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        min-h-0
                        flex-1
                        space-y-5
                        overflow-y-auto
                        px-5
                        py-5
                        sm:px-7
                    "
                >

                    {(error || validationError) && <AdminFeedback className="mb-0" onDismiss={() => { setValidationError(""); onErrorDismiss?.(); }}>{error || validationError}</AdminFeedback>}

                    <section className="space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5" aria-labelledby="cp-problem-details-title">
                        <div>
                            <h3 id="cp-problem-details-title" className="text-sm font-bold text-[var(--theme-text)]">Problem details</h3>
                            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Set the Codeforces reference and where it belongs in the sheet.</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">

                    {/* TITLE */}

                    <div>

                        <label
                            className="
                                mb-1.5
                                block
                                text-sm font-semibold text-[var(--theme-text-secondary)]
                            "
                        >
                            Title
                        </label>

                        <input
                            name="title"
                            value={
                                form.title
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Watermelon"
                            disabled={loading}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-[var(--theme-border)]
                                bg-[var(--theme-surface-raised)]
                                px-3
                                py-2.5
                                text-sm
                                text-[var(--theme-text)]
                                outline-none
                                placeholder:text-[#465364]
                                focus:border-[#4AFFC4]/40
                            "
                        />

                    </div>


                    {/* CODEFORCES ID */}

                    <div>

                        <label
                            className="
                                mb-1.5
                                block
                                text-sm font-semibold text-[var(--theme-text-secondary)]
                            "
                        >
                            Codeforces ID
                        </label>

                        <input
                            name="codeforcesId"
                            value={
                                form.codeforcesId
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="4/A"
                            disabled={loading}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-[var(--theme-border)]
                                bg-[var(--theme-surface-raised)]
                                px-3
                                py-2.5
                                font-mono
                                text-sm
                                text-[var(--theme-accent)]
                                outline-none
                                placeholder:text-[#465364]
                                focus:border-[#4AFFC4]/40
                            "
                        />

                        <p
                            className="
                                mt-1
                                font-mono
                                text-[8px]
                                text-[#465364]
                            "
                        >
                            Example: 71/A
                        </p>

                    </div>

                        </div>

                    {/* RATING + ORDER */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                        "
                    >

                        {/* RATING */}

                        <div>

                            <label
                                className="
                                    mb-1.5
                                    block
                                    text-sm font-semibold text-[var(--theme-text-secondary)]
                                "
                            >
                                Rating
                            </label>

                            <select
                                name="rating"
                                value={
                                    form.rating
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    loading
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-[var(--theme-border)]
                                    bg-[var(--theme-surface-raised)]
                                    px-3
                                    py-2.5
                                    font-mono
                                    text-[10px]
                                    text-[var(--theme-text)]
                                    outline-none
                                    focus:border-[#4AFFC4]/40
                                "
                            >

                                {ratings.map(
                                    (item) => (

                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ORDER */}

                        <div>

                            <label
                                className="
                                    mb-1.5
                                    block
                                    text-sm font-semibold text-[var(--theme-text-secondary)]
                                "
                            >
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                min="1"
                                value={
                                    form.order
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="1"
                                disabled={
                                    loading
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-[var(--theme-border)]
                                    bg-[var(--theme-surface-raised)]
                                    px-3
                                    py-2.5
                                    font-mono
                                    text-[10px]
                                    text-[var(--theme-text)]
                                    outline-none
                                    placeholder:text-[#465364]
                                    focus:border-[#4AFFC4]/40
                                "
                            />

                        </div>

                    </div>


                    {/* HINT */}

                    <div>

                        <label
                            className="
                                mb-1.5
                                block
                                text-sm font-semibold text-[var(--theme-text-secondary)]
                            "
                        >
                            Hint
                        </label>

                        <textarea
                            name="hint"
                            value={
                                form.hint
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Think about..."
                            rows={3}
                            disabled={
                                loading
                            }
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-[var(--theme-border)]
                                bg-[var(--theme-surface-raised)]
                                px-3
                                py-2.5
                                text-[10px]
                                leading-relaxed
                                text-[var(--theme-text)]
                                outline-none
                                placeholder:text-[#465364]
                                focus:border-[#4AFFC4]/40
                            "
                        />

                    </div>

                    </section>

                    <section className="space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5" aria-labelledby="cp-editorial-title">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]"><BookOpen size={16} className="text-[var(--theme-accent)]" /><h3 id="cp-editorial-title">Solution and code</h3></div>
                            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Add an explanation and a reference implementation for students.</p>
                        </div>

                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-[var(--theme-text-secondary)]">Solution explanation</span>
                            <textarea name="solution" value={form.solution} onChange={handleChange} placeholder="Explain the key idea and how to approach the problem…" rows={4} disabled={loading} className="w-full resize-y rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm leading-6 text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10" />
                        </label>

                        <label className="block overflow-hidden rounded-xl border border-[#303030] bg-[#1E1E1E]">
                            <span className="flex items-center justify-between border-b border-[#303030] bg-[#181818] px-4 py-2.5">
                                <span className="flex items-center gap-2 text-xs font-semibold text-[#AEB9C7]"><Terminal size={14} className="text-emerald-400" />solution.cpp</span>
                                <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-[#AEB9C7]">C++</span>
                            </span>
                            <textarea name="code" value={form.code} onChange={handleChange} placeholder={'#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Write the solution here\n}'} rows={12} spellCheck={false} disabled={loading} aria-label="C++ solution code" className="block w-full resize-y overflow-x-auto bg-[#1E1E1E] px-4 py-4 font-mono text-sm font-medium leading-6 text-[#000] caret-emerald-300 outline-none placeholder:text-[#AAB4C0] selection:bg-emerald-400/30 focus:ring-2 focus:ring-inset focus:ring-emerald-400/30" />
                        </label>
                    </section>


                </form>

                <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-5 py-3 sm:px-7">
                    <button type="button" onClick={onClose} disabled={loading} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-surface-high)] disabled:opacity-50">Cancel</button>
                    <button type="submit" form="add-cp-problem-form" disabled={loading} className="min-h-10 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-5 text-sm font-bold text-emerald-950 shadow-md shadow-emerald-500/15 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50">{loading ? (isEditing ? "Saving…" : "Adding…") : (isEditing ? "Save changes" : "Add problem")}</button>
                </div>

            </div>

        </div>

    );

};


export default AddProblemModal;
