// Note: `target` dates for upcoming contests are used to drive the live
// countdown timer — update these when scheduling a new contest.
const CONTESTS = {
  upcoming: [
    {
      name: "CP Weekly #12",
      date: "Sep 2, 2026",
      duration: "2h",
      problems: 6,
      participants: 210,
      target: new Date("2026-09-02T18:00:00"),
    },
    {
      name: "Beginner's Ladder #4",
      date: "Sep 9, 2026",
      duration: "1.5h",
      problems: 5,
      participants: 140,
      target: new Date("2026-09-09T17:00:00"),
    },
  ],
  ongoing: [
    {
      name: "Div 3 Practice Round",
      date: "Today",
      duration: "1h 45m left",
      problems: 7,
      participants: 96,
    },
  ],
  past: [
    { name: "CP Weekly #11", date: "Aug 19, 2026", duration: "2h", problems: 6, participants: 198 },
    { name: "Winter Contest 2025", date: "Dec 14, 2025", duration: "3h", problems: 8, participants: 310 },
    { name: "CP Weekly #10", date: "Aug 5, 2026", duration: "2h", problems: 6, participants: 175 },
  ],
};

export default CONTESTS;
