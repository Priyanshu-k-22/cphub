const CalendarDayCell = ({ date, currentMonth, dayContests, isToday, categories, getCategoryCellStyle, getCategoryBadgeStyle, getPlatformIconStyle, getPlatformIcon, formatTime }) => (
<div
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

export default CalendarDayCell;
