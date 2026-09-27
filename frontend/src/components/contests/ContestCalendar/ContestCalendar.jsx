import { useEffect, useMemo, useState } from "react";

import { getContests } from "../../../api/contest.api";


/*
|--------------------------------------------------------------------------
| Platform Icons
|--------------------------------------------------------------------------
*/

const PLATFORM_ICONS = {
    Codeforces: "CF",
    CodeChef: "CC",
    AtCoder: "AC",
    LeetCode: "LC"
};


/*
|--------------------------------------------------------------------------
| Category Options
|--------------------------------------------------------------------------
*/

const CATEGORY_OPTIONS = [
    {
        label: "All",
        value: ""
    },
    {
        label: "CP",
        value: "CP"
    },
    {
        label: "DSA",
        value: "DSA"
    }
];


/*
|--------------------------------------------------------------------------
| Get Month Start
|--------------------------------------------------------------------------
*/

const getMonthStart = (date) => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    );
};


/*
|--------------------------------------------------------------------------
| Generate Calendar Days
|--------------------------------------------------------------------------
*/

const getCalendarDays = (date) => {

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(
        year,
        month,
        1
    );

    const firstDayOfWeek =
        firstDay.getDay();

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    const previousMonthDays =
        new Date(
            year,
            month,
            0
        ).getDate();

    const days = [];


    /*
     * Previous month days
     */

    for (
        let i = firstDayOfWeek - 1;
        i >= 0;
        i--
    ) {
        days.push({
            date: new Date(
                year,
                month - 1,
                previousMonthDays - i
            ),
            currentMonth: false
        });
    }


    /*
     * Current month days
     */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        days.push({
            date: new Date(
                year,
                month,
                day
            ),
            currentMonth: true
        });
    }


    /*
     * Next month days
     */

    let nextDay = 1;

    while (days.length % 7 !== 0) {

        days.push({
            date: new Date(
                year,
                month + 1,
                nextDay
            ),
            currentMonth: false
        });

        nextDay++;
    }

    return days;
};


/*
|--------------------------------------------------------------------------
| Date Key
|--------------------------------------------------------------------------
*/

const getDateKey = (date) => {

    return [
        date.getFullYear(),
        String(
            date.getMonth() + 1
        ).padStart(2, "0"),
        String(
            date.getDate()
        ).padStart(2, "0")
    ].join("-");
};


/*
|--------------------------------------------------------------------------
| Format Time
|--------------------------------------------------------------------------
*/

const formatTime = (dateString) => {

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata"
        }
    ).format(
        new Date(dateString)
    );
};


/*
|--------------------------------------------------------------------------
| Format Month
|--------------------------------------------------------------------------
*/

const formatMonth = (date) => {

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            month: "long",
            year: "numeric"
        }
    ).format(date);
};


/*
|--------------------------------------------------------------------------
| Contest Calendar
|--------------------------------------------------------------------------
*/

const ContestCalendar = () => {

    const [currentDate, setCurrentDate] =
        useState(
            getMonthStart(new Date())
        );

    const [category, setCategory] =
        useState("");

    const [contests, setContests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
    |--------------------------------------------------------------------------
    | Fetch Contests
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const fetchContests = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getContests({
                        category
                    });

                setContests(
                    response.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch contests:",
                    error
                );

                setError(
                    "Unable to load contests."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchContests();

    }, [category]);


    /*
    |--------------------------------------------------------------------------
    | Calendar Days
    |--------------------------------------------------------------------------
    */

    const calendarDays = useMemo(
        () =>
            getCalendarDays(
                currentDate
            ),
        [currentDate]
    );


    /*
    |--------------------------------------------------------------------------
    | Group Contests By Date
    |--------------------------------------------------------------------------
    */

    const contestsByDate = useMemo(() => {

        const grouped = {};

        contests.forEach((contest) => {

            const date = new Date(
                contest.startTime
            );

            /*
             * Convert to IST before
             * generating the date key.
             */

            const parts =
                new Intl.DateTimeFormat(
                    "en-CA",
                    {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }
                ).formatToParts(date);

            const year =
                parts.find(
                    (part) =>
                        part.type === "year"
                )?.value;

            const month =
                parts.find(
                    (part) =>
                        part.type === "month"
                )?.value;

            const day =
                parts.find(
                    (part) =>
                        part.type === "day"
                )?.value;

            const key =
                `${year}-${month}-${day}`;


            if (!grouped[key]) {
                grouped[key] = [];
            }

            grouped[key].push(
                contest
            );

        });

        return grouped;

    }, [contests]);


    /*
    |--------------------------------------------------------------------------
    | Previous Month
    |--------------------------------------------------------------------------
    */

    const previousMonth = () => {

        setCurrentDate(
            (previous) =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() - 1,
                    1
                )
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Next Month
    |--------------------------------------------------------------------------
    */

    const nextMonth = () => {

        setCurrentDate(
            (previous) =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() + 1,
                    1
                )
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Today
    |--------------------------------------------------------------------------
    */

    const goToToday = () => {

        setCurrentDate(
            getMonthStart(new Date())
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Platform Icon
    |--------------------------------------------------------------------------
    */

    const getPlatformIcon = (platform) => {

        return (
            PLATFORM_ICONS[platform] ||
            "?"
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Platform Icon Style
    |--------------------------------------------------------------------------
    */

    const getPlatformIconStyle = (platform) => {

        switch (platform) {

            case "Codeforces":
                return "bg-blue-500/10 text-blue-400";

            case "CodeChef":
                return "bg-orange-500/10 text-orange-400";

            case "AtCoder":
                return "bg-red-500/10 text-red-400";

            case "LeetCode":
                return "bg-yellow-500/10 text-yellow-400";

            default:
                return "bg-[#111923] text-[#4affc4]";
        }

    };


    /*
    |--------------------------------------------------------------------------
    | Category Cell Tint
    |--------------------------------------------------------------------------
    */

    const getCategoryCellStyle = (
        dayContests,
        currentMonth
    ) => {

        if (!currentMonth) {
            return "bg-[#060a10]/60";
        }


        const hasCP =
            dayContests.some(
                (contest) =>
                    contest.category === "CP"
            );


        const hasDSA =
            dayContests.some(
                (contest) =>
                    contest.category === "DSA"
            );


        /*
         * Both CP and DSA
         */

        if (hasCP && hasDSA) {

            return "bg-gradient-to-br from-blue-500/[0.13] via-[#0b1119] to-emerald-500/[0.13]";
        }


        /*
         * CP only
         */

        if (hasCP) {

            return "bg-blue-500/[0.12] border-blue-400/30";
        }


        /*
         * DSA only
         */

        if (hasDSA) {

            return "bg-emerald-500/[0.12] border-emerald-400/30";
        }


        /*
         * No contest
         */

        return "bg-[#080d14]";
    };


    /*
    |--------------------------------------------------------------------------
    | Category Badge Style
    |--------------------------------------------------------------------------
    */

    const getCategoryBadgeStyle = (
        category
    ) => {

        if (category === "CP") {

            return "bg-blue-400/10 text-blue-400 border border-blue-400/10";
        }

        return "bg-green-400/10 text-green-400 border border-green-400/10";
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <section className="contest-calendar w-full px-3 py-4 md:px-6 md:py-6">

            {/* Header */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[#4affc4]">
                        Contest Calendar
                    </p>

                    <h1 className="text-3xl font-semibold text-[#edf2f7] md:text-4xl">
                        Upcoming Contests
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-[#aeb9c7]">
                        Keep track of upcoming CP and DSA contests across popular platforms.
                    </p>

                </div>


                {/* Category Filter */}

                <div className="flex gap-2 rounded-xl border border-[#1c2734] bg-[#0a1018] p-1">

                    {CATEGORY_OPTIONS.map(
                        (option) => (

                            <button
                                key={
                                    option.value ||
                                    "all"
                                }
                                type="button"
                                onClick={() =>
                                    setCategory(
                                        option.value
                                    )
                                }
                                className={`rounded-lg px-4 py-2 text-sm transition ${
                                    category ===
                                    option.value
                                        ? "bg-[#4affc4] text-[#060a10]"
                                        : "text-[#aeb9c7] hover:bg-[#111923] hover:text-[#edf2f7]"
                                }`}
                            >
                                {option.label}
                            </button>

                        )
                    )}

                </div>

            </div>


            {/* Legend */}

            <div className="mb-4 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-sm bg-blue-400/50" />

                    <span className="text-xs text-[#718096]">
                        CP
                    </span>

                </div>


                <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-sm bg-green-400/50" />

                    <span className="text-xs text-[#718096]">
                        DSA
                    </span>

                </div>

            </div>


            {/* Calendar Controls */}

            <div className="mb-4 flex items-center justify-between">

                <button
                    type="button"
                    onClick={previousMonth}
                    className="rounded-lg border border-[#1c2734] px-3 py-2 text-[#aeb9c7] transition hover:border-[#4affc4] hover:text-[#4affc4]"
                >
                    ←
                </button>


                <div className="flex items-center gap-4">

                    <h2 className="text-lg font-medium text-[#edf2f7]">
                        {formatMonth(
                            currentDate
                        )}
                    </h2>

                    <button
                        type="button"
                        onClick={goToToday}
                        className="rounded-lg border border-[#1c2734] px-3 py-1.5 text-xs text-[#aeb9c7] transition hover:border-[#4affc4] hover:text-[#4affc4]"
                    >
                        Today
                    </button>

                </div>


                <button
                    type="button"
                    onClick={nextMonth}
                    className="rounded-lg border border-[#1c2734] px-3 py-2 text-[#aeb9c7] transition hover:border-[#4affc4] hover:text-[#4affc4]"
                >
                    →
                </button>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                    {error}
                </div>

            )}


            {/* Calendar */}

            <div className="overflow-hidden rounded-2xl border border-[#1c2734] bg-[#080d14] p-3 md:p-4">

                {/* Weekdays */}

                <div className="grid grid-cols-7 rounded-lg border border-[#1c2734]">

                    {[
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                    ].map(
                        (day) => (

                            <div
                                key={day}
                                className="border-r border-[#1c2734] px-1 py-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-[#556275] last:border-r-0 md:text-[11px]"
                            >
                                {day}
                            </div>

                        )
                    )}

                </div>


                {/* Calendar Days */}

                {loading ? (

                    <div className="flex min-h-[500px] items-center justify-center text-sm text-[#556275]">
                        Loading contests...
                    </div>

                ) : (

                    <div className="mt-2 grid grid-cols-7 overflow-hidden rounded-lg border border-[#1c2734]">

                        {calendarDays.map(
                            ({
                                date,
                                currentMonth
                            }) => {

                                const key =
                                    getDateKey(
                                        date
                                    );


                                const dayContests =
                                    contestsByDate[
                                        key
                                    ] || [];


                                const isToday =
                                    getDateKey(
                                        date
                                    ) ===
                                    getDateKey(
                                        new Date()
                                    );


                                /*
                                 * Get categories
                                 * available on this day.
                                 */

                                const categories =
                                    [
                                        ...new Set(
                                            dayContests.map(
                                                (
                                                    contest
                                                ) =>
                                                    contest.category
                                            )
                                        )
                                    ];


                                return (

                                    <div
                                        key={key}
                                        className={`min-h-[70px] border-b border-r border-[#1c2734] p-1.5 md:min-h-[80px] md:p-2 ${getCategoryCellStyle(
                                            dayContests,
                                            currentMonth
                                        )}`}
                                    >

                                        {/* Date */}

                                        <div className="mb-1.5 flex justify-end">

                                            <span
                                                className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] ${
                                                    isToday
                                                        ? "bg-[#4affc4] font-semibold text-[#060a10]"
                                                        : currentMonth
                                                        ? "text-[#aeb9c7]"
                                                        : "text-[#3e4a59]"
                                                }`}
                                            >
                                                {
                                                    date.getDate()
                                                }
                                            </span>

                                        </div>


                                        {/* Category Badges */}

                                        {dayContests.length >
                                            0 && (

                                            <div className="mb-1.5 flex flex-wrap gap-1">

                                                {categories.map(
                                                    (
                                                        type
                                                    ) => (

                                                        <span
                                                            key={
                                                                type
                                                            }
                                                            className={`rounded px-1 py-0.5 font-mono text-[7px] font-semibold ${getCategoryBadgeStyle(
                                                                type
                                                            )}`}
                                                        >
                                                            {
                                                                type
                                                            }
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        )}


                                        {/* Contest List */}

                                        <div className="space-y-1">

                                            {dayContests.map(
                                                (
                                                    contest,
                                                    index
                                                ) => (

                                                    <a
                                                        key={`${contest.platform}-${contest.name}-${contest.startTime}-${index}`}
                                                        href={
                                                            contest.externalLink
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block rounded-md border border-[#1c2734] bg-[#0d141d]/90 p-1.5 transition hover:border-[#4affc4]/50 hover:bg-[#111b25]"
                                                    >

                                                        {/* Contest Name */}

                                                        <div className="flex min-w-0 items-center gap-1.5">

                                                            <span
                                                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[9px] font-bold ${getPlatformIconStyle(
                                                                    contest.platform
                                                                )}`}
                                                            >
                                                                {
                                                                    getPlatformIcon(
                                                                        contest.platform
                                                                    )
                                                                }
                                                            </span>


                                                            <span className="truncate text-[11px] font-medium text-[#f1f5f9]">
                                                                {
                                                                    contest.name
                                                                }
                                                            </span>

                                                        </div>


                                                        {/* Time */}

                                                        <div className="mt-1 flex items-center justify-between gap-1">

                                                            <span className="text-[10px] text-[#94a3b8]">
                                                                {
                                                                    formatTime(
                                                                        contest.startTime
                                                                    )
                                                                }
                                                            </span>

                                                        </div>

                                                    </a>

                                                )
                                            )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </section>

    );
};


export default ContestCalendar;
