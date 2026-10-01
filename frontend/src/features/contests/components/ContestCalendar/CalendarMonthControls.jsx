import { formatMonth } from "./calendarUtils";

const CalendarMonthControls = ({ currentDate, previousMonth, nextMonth, goToToday }) => (
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
);

export default CalendarMonthControls;
