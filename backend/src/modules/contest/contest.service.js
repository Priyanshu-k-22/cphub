const axios = require("axios");

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

const IST_OFFSET = "+05:30";

const BIWEEKLY_ANCHOR = new Date(
    "2026-09-26T20:00:00+05:30"
);


/*
|--------------------------------------------------------------------------
| Codeforces
|--------------------------------------------------------------------------
*/

const fetchCodeforcesContests = async () => {
    const response = await axios.get(
        "https://codeforces.com/api/contest.list",
        { timeout: 8000 }
    );

    const contests = response.data.result;

    return contests
        .filter((contest) => {
            if (contest.phase !== "BEFORE") {
                return false;
            }

            // Exclude Div. 1 only
            const isDiv1Only =
                /\(Div\.\s*1\)/i.test(contest.name);

            if (isDiv1Only) {
                return false;
            }

            return true;
        })
        .map((contest) => {
            const startTime = new Date(
                contest.startTimeSeconds * 1000
            );

            const endTime = new Date(
                (
                    contest.startTimeSeconds +
                    contest.durationSeconds
                ) * 1000
            );

            return {
                name: contest.name,
                platform: "Codeforces",
                category: "CP",
                startTime,
                endTime,
                externalLink:
                    `https://codeforces.com/contest/${contest.id}`
            };
        });
};


/*
|--------------------------------------------------------------------------
| CodeChef
|--------------------------------------------------------------------------
*/

const generateCodeChefContests = () => {
    const contests = [];

    const today = new Date();

    /*
     * Generate next 30 days.
     */
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);

        date.setDate(
            today.getDate() + i
        );

        const day = date.getDay();

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const dateNumber = String(
            date.getDate()
        ).padStart(2, "0");

        const dateString =
            `${year}-${month}-${dateNumber}`;


        /*
         * Monday Munch
         *
         * Monday
         * 7:00 PM IST
         * 3 hours
         *
         * Category: DSA
         */
        if (day === 1) {
            const startTime = new Date(
                `${dateString}T19:00:00${IST_OFFSET}`
            );

            const endTime = new Date(
                startTime.getTime() +
                3 * 60 * 60 * 1000
            );

            contests.push({
                name: "Monday Munch",
                platform: "CodeChef",
                category: "DSA",
                startTime,
                endTime,
                externalLink:
                    "https://www.codechef.com/contests"
            });
        }


        /*
         * Starters
         *
         * Wednesday
         * 8:00 PM IST
         * 2 hours
         *
         * Category: CP
         */
        if (day === 3) {
            const startTime = new Date(
                `${dateString}T20:00:00${IST_OFFSET}`
            );

            const endTime = new Date(
                startTime.getTime() +
                2 * 60 * 60 * 1000
            );

            contests.push({
                name: "Starters",
                platform: "CodeChef",
                category: "CP",
                startTime,
                endTime,
                externalLink:
                    "https://www.codechef.com/"
            });
        }
    }

    return contests;
};


/*
|--------------------------------------------------------------------------
| AtCoder
|--------------------------------------------------------------------------
*/

const generateAtCoderContests = () => {
    const contests = [];

    const today = new Date();

    /*
     * Generate next 30 days.
     *
     * Saturday
     * 7:30 PM IST
     * 100 minutes
     *
     * Category: CP
     */
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);

        date.setDate(
            today.getDate() + i
        );

        if (date.getDay() !== 6) {
            continue;
        }

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const dateNumber = String(
            date.getDate()
        ).padStart(2, "0");

        const dateString =
            `${year}-${month}-${dateNumber}`;

        const startTime = new Date(
            `${dateString}T19:30:00${IST_OFFSET}`
        );

        const endTime = new Date(
            startTime.getTime() +
            100 * 60 * 1000
        );

        contests.push({
            name: "AtCoder Beginner Contest",
            platform: "AtCoder",
            category: "CP",
            startTime,
            endTime,
            externalLink:
                "https://atcoder.jp/contests/"
        });
    }

    return contests;
};


/*
|--------------------------------------------------------------------------
| LeetCode
|--------------------------------------------------------------------------
*/

const generateLeetCodeContests = () => {
    const contests = [];

    const today = new Date();

    /*
     * Generate next 30 days.
     */
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);

        date.setDate(
            today.getDate() + i
        );

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const dateNumber = String(
            date.getDate()
        ).padStart(2, "0");

        const dateString =
            `${year}-${month}-${dateNumber}`;


        /*
         * Weekly Contest
         *
         * Sunday
         * 8:00 AM IST
         * 90 minutes
         *
         * Category: DSA
         */
        if (date.getDay() === 0) {
            const startTime = new Date(
                `${dateString}T08:00:00${IST_OFFSET}`
            );

            const endTime = new Date(
                startTime.getTime() +
                90 * 60 * 1000
            );

            contests.push({
                name: "Weekly Contest",
                platform: "LeetCode",
                category: "DSA",
                startTime,
                endTime,
                externalLink:
                    "https://leetcode.com/contest/"
            });
        }


        /*
         * Biweekly Contest
         *
         * Saturday
         * 8:00 PM IST
         * 90 minutes
         *
         * Every 14 days.
         *
         * Anchor:
         * 26 September 2026
         *
         * Category: DSA
         */
        if (date.getDay() === 6) {
            const startTime = new Date(
                `${dateString}T20:00:00${IST_OFFSET}`
            );

            const difference =
                startTime.getTime() -
                BIWEEKLY_ANCHOR.getTime();

            const daysDifference =
                Math.round(
                    difference /
                    (24 * 60 * 60 * 1000)
                );

            if (
                daysDifference >= 0 &&
                daysDifference % 14 === 0
            ) {
                const endTime = new Date(
                    startTime.getTime() +
                    90 * 60 * 1000
                );

                contests.push({
                    name: "Biweekly Contest",
                    platform: "LeetCode",
                    category: "DSA",
                    startTime,
                    endTime,
                    externalLink:
                        "https://leetcode.com/contest/"
                });
            }
        }
    }

    return contests;
};


/*
|--------------------------------------------------------------------------
| Get All Contests
|--------------------------------------------------------------------------
*/

const getContests = async ({
    category
} = {}) => {

    /*
     * Fetch Codeforces contests
     * and generate scheduled contests
     * in parallel.
     */
    const [
        codeforcesContests
    ] = await Promise.all([
        fetchCodeforcesContests()
    ]);

    const scheduledContests = [
        ...generateCodeChefContests(),
        ...generateAtCoderContests(),
        ...generateLeetCodeContests()
    ];

    let contests = [
        ...codeforcesContests,
        ...scheduledContests
    ];


    /*
     * Optional category filter
     */
    if (category) {
        contests = contests.filter(
            (contest) =>
                contest.category === category
        );
    }


    /*
     * Sort by start time
     */
    contests.sort(
        (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
    );


    return contests;
};


/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {
    fetchCodeforcesContests,
    generateCodeChefContests,
    generateAtCoderContests,
    generateLeetCodeContests,
    getContests
};
