export const PLATFORM_ICONS = {
    Codeforces: "CF",
    CodeChef: "CC",
    AtCoder: "AC",
    LeetCode: "LC",
};

export const CATEGORY_OPTIONS = [
    { label: "All", value: "" },
    { label: "CP", value: "CP" },
    { label: "DSA", value: "DSA" },
];

export const getMonthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({ date: new Date(year, month - 1, previousMonthDays - i), currentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push({ date: new Date(year, month, day), currentMonth: true });
    }
    let nextDay = 1;
    while (days.length % 7 !== 0) {
        days.push({ date: new Date(year, month + 1, nextDay++), currentMonth: false });
    }
    return days;
};

export const getDateKey = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
].join("-");

export const formatTime = (dateString) => new Intl.DateTimeFormat("en-IN", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
}).format(new Date(dateString));

export const formatMonth = (date) => new Intl.DateTimeFormat("en-IN", {
    month: "long", year: "numeric",
}).format(date);
