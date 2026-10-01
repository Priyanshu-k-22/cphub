import { useEffect, useMemo, useState } from "react";

import { getContests } from "../../api/contest.api";
import { PLATFORM_ICONS, CATEGORY_OPTIONS, getMonthStart, getCalendarDays, getDateKey, formatTime } from "./calendarUtils";
import CalendarDayCell from "./CalendarDayCell";
import CalendarMonthControls from "./CalendarMonthControls";
import CalendarCategoryFilter from "./CalendarCategoryFilter";


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

                <CalendarCategoryFilter options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />

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

            <CalendarMonthControls currentDate={currentDate} previousMonth={previousMonth} nextMonth={nextMonth} goToToday={goToToday} />


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

                                    <CalendarDayCell key={key} date={date} currentMonth={currentMonth} dayContests={dayContests} isToday={isToday} categories={categories} getCategoryCellStyle={getCategoryCellStyle} getCategoryBadgeStyle={getCategoryBadgeStyle} getPlatformIconStyle={getPlatformIconStyle} getPlatformIcon={getPlatformIcon} formatTime={formatTime} />

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
