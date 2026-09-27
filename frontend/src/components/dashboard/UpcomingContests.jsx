import React, {
    useEffect,
    useState
} from "react";

import {
    ExternalLink
} from "lucide-react";

import {
    getContests
} from "../../api/contest.api";


const UpcomingContests = () => {

    const [contests, setContests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Fetch contests
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const fetchContests = async () => {

            try {

                setLoading(true);
                setError(null);

                const response =
                    await getContests();


                /*
                |--------------------------------------------------------------------------
                | Backend returns contests in sorted order.
                | Still sort here to make the component safe.
                |--------------------------------------------------------------------------
                */

                const allContests =
                    response.data || [];


                const upcoming =
                    allContests
                        .filter(
                            (contest) =>
                                new Date(
                                    contest.startTime
                                ) > new Date()
                        )
                        .sort(
                            (a, b) =>
                                new Date(a.startTime) -
                                new Date(b.startTime)
                        )
                        .slice(0, 3);


                setContests(upcoming);

            } catch (error) {

                console.error(
                    "Failed to fetch contests:",
                    error
                );

                setError(
                    "Failed to load contests."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchContests();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Format date
    |--------------------------------------------------------------------------
    */

    const formatContestDate = (date) => {

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-[#556275]
                        ">
                            Upcoming Contests
                        </p>

                        <div className="
                            mt-2
                            h-4
                            w-28
                            animate-pulse
                            rounded
                            bg-[#1C2734]
                        " />

                    </div>

                </div>


                <div className="mt-4 space-y-2">

                    {[1, 2, 3].map((item) => (

                        <div
                            key={item}
                            className="
                                h-14
                                animate-pulse
                                rounded-lg
                                bg-[#111923]
                            "
                        />

                    ))}

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <p className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-[#556275]
                ">
                    Upcoming Contests
                </p>

                <p className="
                    mt-3
                    text-xs
                    text-red-400
                ">
                    {error}
                </p>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | No contests
    |--------------------------------------------------------------------------
    */

    if (contests.length === 0) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <p className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-[#556275]
                ">
                    Upcoming Contests
                </p>

                <p className="
                    mt-3
                    text-xs
                    text-[#6B7788]
                ">
                    No upcoming contests found.
                </p>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Main UI
    |--------------------------------------------------------------------------
    */

    return (
        <div className="
            rounded-xl
            border
            border-[#1C2734]
            bg-[#0A1018]
            p-4
        ">


            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <p className="
                        text-sm font-semibold
                    ">
                        Upcoming Contests
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-[#6B7788]
                    ">
                        Your next three contests
                    </p>

                </div>


                <span className="
                    rounded-full
                    bg-[#4AFFC4]/10
                    px-2
                    py-1
                    font-mono
                    text-[9px]
                    text-[#4AFFC4]
                ">
                    NEXT 3
                </span>

            </div>


            {/* =========================================================
                CONTEST LIST
            ========================================================== */}

            <div className="mt-4 space-y-2">

                {contests.map((contest, index) => (

                    <a
                        key={`${contest.name}-${contest.startTime}-${index}`}
                        href={contest.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            gap-3
                            rounded-lg
                            border
                            border-[#1C2734]
                            bg-[#080D14]
                            px-3
                            py-2.5
                            transition
                            hover:border-[#4AFFC4]/40
                            hover:bg-[#0D151F]
                        "
                    >

                        <div className="
                            min-w-0
                            flex
                            items-center
                            gap-3
                        ">


                            {/* =================================================
                                NUMBER
                            ================================================== */}

                            <span className="
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded
                                bg-[#111923]
                                font-mono
                                text-[9px]
                                text-[#556275]
                            ">
                                {index + 1}
                            </span>


                            {/* =================================================
                                CONTEST INFO
                            ================================================== */}

                            <div className="min-w-0">

                                <p className="
                                    truncate
                                    text-xs
                                    font-medium
                                    text-white
                                    transition
                                    group-hover:text-[#4AFFC4]
                                ">
                                    {contest.name}
                                </p>


                                <div className="
                                    mt-0.5
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <span className="
                                        font-mono
                                        text-[9px]
                                        text-[#556275]
                                    ">
                                        {contest.platform}
                                    </span>


                                    <span className="
                                        text-[#273442]
                                    ">
                                        ·
                                    </span>


                                    <span className="
                                        font-mono
                                        text-[9px]
                                        text-[#556275]
                                    ">
                                        {contest.category}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            DATE + LINK
                        ================================================== */}

                        <div className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                        ">

                            <span className="
                                hidden
                                font-mono
                                text-[9px]
                                text-[#6B7788]
                                sm:block
                            ">
                                {formatContestDate(
                                    contest.startTime
                                )}
                            </span>


                            <ExternalLink
                                size={13}
                                className="
                                    text-[#556275]
                                    transition
                                    group-hover:text-[#4AFFC4]
                                "
                            />

                        </div>

                    </a>

                ))}

            </div>

        </div>
    );
};


export default UpcomingContests;