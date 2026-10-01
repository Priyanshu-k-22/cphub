export const BACKGROUND_DATA = {
    home: {
        code: [
            `#include <cphub.h>
#include <algorithm>
#include <vector>

using namespace std;
using namespace cphub;`,

            `Contest contest;

contest.start();
solve();
submit();

if (accepted) {
    improve();
}`,

            `for (auto problem : problems) {
    solve(problem);
    submit(problem);
}

// think
// code
// repeat`,

            `while (!solved) {
    practice();
    try_again();
}`,

            `if (rating > previous_rating) {
    cout << "LEVEL UP";
}`,

            `vector<int> skills;

sort(
    skills.begin(),
    skills.end()
);`,
        ],

        fragments: [
            "O(log n)",
            "solve()",
            "submit()",
            "accepted",
            "competitive_programming",
            "rating++",
            "practice()",
            "think > code > repeat",
        ],

        terminals: [
            {
                command: "cphub@contestant:~$ ./start",
                output: "ready_for_contest",
            },
        ],
    },

    problems: {
        code: [
            `vector<int> a;

sort(a.begin(),
     a.end());

two_pointer(a);`,

            `int l = 0;
int r = n - 1;

while (l < r) {
    solve(l, r);
}`,

            `for (int i = 0; i < n; i++) {
    dp[i] = best(i);
}`,

            `graph[u].push_back(v);

dfs(u);
bfs(source);`,
        ],

        fragments: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)",
            "O(n²)",
            "two_pointer",
            "binary_search",
            "dynamic_programming",
            "graph[u]",
            "dp[i]",
            "visited[]",
        ],

        terminals: [
            {
                command: "cphub@problems:~$ ./filter",
                output: "1000+ problems found",
            },
        ],
    },

    contests: {
        code: [
            `Contest contest;

contest.start_time =
    "20:05";

contest.duration =
    2h + 15min;`,

            `register(contest);

wait_for_start();

while (contest.active()) {
    solve();
}`,

            `if (submitted) {
    judge(solution);

    if (accepted)
        increase_rating();
}`,
        ],

        fragments: [
            "CONTEST",
            "REGISTER",
            "START",
            "2h 15min",
            "ACCEPTED",
            "WRONG ANSWER",
            "TIME LIMIT",
            "RATING",
            "SUBMIT",
        ],

        terminals: [
            {
                command: "cphub@contest:~$ status",
                output: "contest_upcoming",
            },
        ],
    },

    leaderboard: {
        code: [
            `Leaderboard board;

board.sort_by(
    rating,
    descending
);`,

            `for (auto user : leaderboard) {
    display(
        user.rank,
        user.rating
    );
}`,

            `if (rank < previous_rank) {
    cout << "CLIMBING";
}`,
        ],

        fragments: [
            "#01",
            "#02",
            "#03",
            "rating",
            "rank",
            "score",
            "ACCEPTED",
            "CLIMBING",
            "top_contestants",
        ],

        terminals: [
            {
                command: "cphub@leaderboard:~$ ./rank",
                output: "ranking_updated",
            },
        ],
    },

    dashboard: {
        code: [
            `Contestant user;

user.problems_solved =
    127;

user.rating =
    1248;`,

            `user.streak =
    17;

user.contests =
    24;`,

            `while (improving) {
    practice();
    compete();
    repeat();
}`,
        ],

        fragments: [
            "problems_solved",
            "rating",
            "streak",
            "contests",
            "rank",
            "progress",
            "next_goal",
            "keep_grinding",
        ],

        terminals: [
            {
                command: "cphub@dashboard:~$ ./stats",
                output: "progress_loaded",
            },
        ],
    },

    about: {
        code: [
            `namespace cphub {

    practice();
    compete();
    improve();

}`,

            `Mission mission;

mission.build_community();
mission.share_knowledge();
mission.create_opportunities();`,

            `if (student.needs_help()) {
    community.support(student);
}`,
        ],

        fragments: [
            "community",
            "practice",
            "compete",
            "learn",
            "build",
            "share",
            "grow",
        ],

        terminals: [],
    },

    default: {
        code: [
            `#include <cphub.h>

using namespace cphub;

int main() {
    solve();
    compete();
    improve();

    return 0;
}`,

            `for (auto problem : problems) {
    solve(problem);
    submit(problem);
}`,

            `// think
// code
// compete
// repeat`,
        ],

        fragments: [
            "O(log n)",
            "solve()",
            "submit()",
            "accepted",
            "rating++",
            "practice()",
        ],

        terminals: [],
    },
};