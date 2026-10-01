import React, {
    useEffect,
    useState
} from "react";

import {
    X
} from "lucide-react";


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
    isEditing = false
}) => {

    const [form, setForm] = useState({
        title: "",
        codeforcesId: "",
        rating: 800,
        order: "",
        hint: ""
    });


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
                rating: initialProblem?.rating || 800,
                order: initialProblem?.order ?? "",
                hint: initialProblem?.hint || ""
            });

        }

    }, [initialProblem, isOpen]);


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

            alert(
                "Please fill all required fields."
            );

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
                form.hint.trim()
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
                bg-black/70
                px-4
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
                    w-full
                    max-w-md
                    rounded-xl
                    border
                    border-[#1C2734]
                    bg-[#080D14]
                    shadow-2xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex
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
                                text-sm
                                font-semibold
                                text-[#DCE4ED]
                            "
                        >
                            {isEditing ? "Edit CP Problem" : "Add CP Problem"}
                        </h2>

                        <p
                            className="
                                mt-1
                                font-mono
                                text-[8px]
                                text-[#556275]
                            "
                        >
                            {isEditing ? "Update the CP sheet problem" : "Add a problem to the CP sheet"}
                        </p>

                    </div>


                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-1.5
                            text-[#556275]
                            hover:bg-[#0D151F]
                            hover:text-[#DCE4ED]
                        "
                    >

                        <X
                            size={16}
                        />

                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        space-y-4
                        px-5
                        py-5
                    "
                >

                    {/* TITLE */}

                    <div>

                        <label
                            className="
                                mb-1.5
                                block
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-wide
                                text-[#7F8B9C]
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
                                rounded-lg
                                border
                                border-[#1C2734]
                                bg-[#0B1119]
                                px-3
                                py-2.5
                                text-[11px]
                                text-[#DCE4ED]
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
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-wide
                                text-[#7F8B9C]
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
                                rounded-lg
                                border
                                border-[#1C2734]
                                bg-[#0B1119]
                                px-3
                                py-2.5
                                font-mono
                                text-[11px]
                                text-[#4AFFC4]
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
                                    font-mono
                                    text-[9px]
                                    uppercase
                                    tracking-wide
                                    text-[#7F8B9C]
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
                                    rounded-lg
                                    border
                                    border-[#1C2734]
                                    bg-[#0B1119]
                                    px-3
                                    py-2.5
                                    font-mono
                                    text-[10px]
                                    text-[#DCE4ED]
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
                                    font-mono
                                    text-[9px]
                                    uppercase
                                    tracking-wide
                                    text-[#7F8B9C]
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
                                    rounded-lg
                                    border
                                    border-[#1C2734]
                                    bg-[#0B1119]
                                    px-3
                                    py-2.5
                                    font-mono
                                    text-[10px]
                                    text-[#DCE4ED]
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
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-wide
                                text-[#7F8B9C]
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
                                rounded-lg
                                border
                                border-[#1C2734]
                                bg-[#0B1119]
                                px-3
                                py-2.5
                                text-[10px]
                                leading-relaxed
                                text-[#DCE4ED]
                                outline-none
                                placeholder:text-[#465364]
                                focus:border-[#4AFFC4]/40
                            "
                        />

                    </div>


                    {/* ACTIONS */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-2
                            pt-2
                        "
                    >

                        <button
                            type="button"
                            disabled={
                                loading
                            }
                            onClick={
                                onClose
                            }
                            className="
                                rounded-lg
                                border
                                border-[#1C2734]
                                px-4
                                py-2
                                font-mono
                                text-[9px]
                                text-[#7F8B9C]
                                hover:bg-[#0D151F]
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="
                                rounded-lg
                                bg-[#4AFFC4]
                                px-4
                                py-2
                                font-mono
                                text-[9px]
                                font-semibold
                                text-[#06100C]
                                transition
                                hover:bg-[#69FFD0]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {loading
                                ? (isEditing ? "Saving..." : "Adding...")
                                : (isEditing ? "Save Changes" : "Add Problem")
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default AddProblemModal;
