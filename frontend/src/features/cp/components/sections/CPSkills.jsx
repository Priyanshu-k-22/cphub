import React from "react";

const CPSkills = () => (
    <Page
        label="cp / skills"
        title="The Skills Competitive Programming Builds"
        subtitle="CP develops more than coding fluency. It gives you a place to practise mathematical reasoning, creative problem solving, precision, and learning from difficulty."
    >
        <div className="space-y-6">
            <section className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">A familiar moment</p>
                <h2 className="mt-3 text-2xl font-bold">The answer is there—but the obvious method is too slow</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    Imagine a problem asks how many pairs of students have birthdays on the same day. You could compare every student with every other student. That works for a small group. But if there are thousands of students, checking every pair becomes wasteful.
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    Mathematics offers a surprising shortcut: there are only 366 possible birthdays if we include February 29. With 367 students, at least two must share a birthday. No pair-by-pair search is needed. This is the pigeonhole principle—a simple mathematical idea that turns a large search into a direct conclusion.
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    CP repeatedly gives you opportunities to make this kind of leap: model a situation, notice a relationship, prove what must be true, and turn that insight into a solution.
                </p>
            </section>

            <ArticleSection title="Mathematics: the language beneath many solutions" eyebrow="A special place in CP">
                <p>
                    Mathematics is one of CP’s most powerful tools. A problem may look like a story about coins, games, roads, or arranging objects. Underneath, it may be asking about divisibility, parity, counting, distance, or the best way to choose among possibilities.
                </p>
                <p>
                    You do not need advanced mathematics to begin. Many problems use arithmetic, remainders, factors, or patterns you can understand from examples. Harder topics—such as number theory, combinatorics, probability, and geometry—can be learned gradually as you encounter them.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    <MathCard title="Parity reveals what is possible" example="If you add an odd number of odd values, the sum is odd. If a puzzle asks for an even sum, that tells you something about how many odd values the solution must contain." />
                    <MathCard title="Remainders expose repeating cycles" example="A clock wraps around after 12 hours. Instead of counting endlessly, use remainders: 15 hours after 10 o’clock is (10 + 15) mod 12 = 1 o’clock." />
                    <MathCard title="Counting can replace trying every choice" example="When choosing 2 people from n people, the number of pairs is n(n − 1)/2. A formula can answer a question that would otherwise require listing each pair." />
                    <MathCard title="Invariants tell you what cannot change" example="In some moves-on-a-board puzzles, every move changes the color of a square. Color parity can prove that a target position is impossible, even without simulating every move." />
                </div>
                <p>
                    The important habit is not memorizing formulas. It is asking: what quantities matter, what relationships connect them, and what must always remain true?
                </p>
            </ArticleSection>

            <ArticleSection title="Turning a story into a mathematical model">
                <p>
                    A problem statement may describe a real or imaginary situation, but a solution depends on identifying its essential structure. You learn to translate words into variables, conditions, equations, graphs, or sets.
                </p>
                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Example: sharing sweets</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--theme-text-secondary)]">
                        “Can these candies be divided equally among k children?” becomes: is the number of candies divisible by <Code>k</Code>? In code, the key test is <Code>n % k == 0</Code>. The story has become a precise mathematical condition.
                    </p>
                </div>
                <p>
                    This modelling skill is useful whenever a task is described in everyday language but must be answered exactly. Before thinking about code, you learn to ask what the problem is really measuring.
                </p>
            </ArticleSection>

            <ArticleSection title="Solving problems you have never seen">
                <p>
                    Many CP problems do not announce which algorithm to use. You practise facing an unfamiliar task without waiting for a template. You simplify it, try tiny examples, compare cases, and search for a pattern or a useful representation.
                </p>
                <p>
                    Sometimes a direct approach works. Sometimes you discover that sorting reveals order, a set remembers what has appeared, a graph captures connections, or dynamic programming reuses results from smaller subproblems. The skill is learning how to explore possibilities and justify the one you choose.
                </p>
                <Callout>“I haven’t seen this exact problem” becomes “What structure does this problem have?”</Callout>
            </ArticleSection>

            <ArticleSection title="Logical reasoning and proof">
                <p>
                    A solution needs more than a plausible idea. You need to understand why it works for every valid input, including cases that are not shown in the examples. CP develops the habit of checking both directions: if your method reports an answer, is that answer truly valid? And if a valid answer exists, will your method find it?
                </p>
                <p>
                    You will use arguments about parity, ordering, bounds, induction, invariants, and exchange choices. At first, these may feel formal. With practice, they become practical questions: “Could this miss a case?” “Why is this greedy choice safe?” “What does this loop guarantee after each step?”
                </p>
            </ArticleSection>

            <ArticleSection title="Algorithmic thinking and efficiency">
                <p>
                    CP teaches you to compare solutions by how their work grows. Checking every pair may take <Code>O(n²)</Code>; sorting may take <Code>O(n log n)</Code>; a single scan may take <Code>O(n)</Code>. These describe growth rates, not exact seconds, and they help you judge whether your approach can handle the constraints.
                </p>
                <p>
                    You also learn to choose representations that make operations easier: a hash set for membership checks, a queue for processing in order, a graph for relationships, or a prefix sum for repeated range totals. The right representation can make a difficult-looking task manageable.
                </p>
            </ArticleSection>

            <ArticleSection title="Precision in implementation">
                <p>
                    Turning a mathematical idea into code requires care. A boundary can be off by one. A number can exceed the chosen type. A valid corner case can break an assumption. Input can be larger than expected.
                </p>
                <p>
                    CP gives repeated practice making reasoning precise enough for a computer to execute: choosing data types, organizing loops, following exact input/output formats, and checking that the code matches the proof.
                </p>
            </ArticleSection>

            <ArticleSection title="Debugging, patience, and learning from failure">
                <p>
                    A wrong answer or time limit exceeded result can be frustrating. It can also narrow down what to investigate. Maybe the problem was misunderstood, a mathematical assumption was false, a boundary case was missed, or the algorithm did too much work.
                </p>
                <p>
                    Over time, you develop a calmer response: reproduce the issue, reduce it to a small case, inspect the logic, and change one thing at a time. You learn that being stuck is part of problem solving, not evidence that you cannot do it.
                </p>
            </ArticleSection>

            <ArticleSection title="What these skills can—and cannot—do">
                <p>
                    Mathematical reasoning, algorithmic thinking, and careful implementation can support coursework, technical interviews, software engineering, and fields that work with algorithms or optimization. CP is a focused way to practise these abilities.
                </p>
                <p>
                    CP does not automatically teach software architecture, collaboration, product design, or every skill needed for a job. Those matter too. The value of CP is that it gives you a challenging space to strengthen a particular set of thinking and coding skills.
                </p>
            </ArticleSection>

            <section className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-surface)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">The skills loop</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {["Model the situation", "Find the mathematical structure", "Explore possible approaches", "Prove the key idea", "Implement precisely", "Test, debug, and learn"].map((item, index) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-4">
                            <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">0{index + 1}</span>
                            <span className="text-sm font-semibold text-[var(--theme-text)]">{item}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--theme-text-secondary)]">
                    You do not need to be “a maths person” before starting. CP can help you become more comfortable with mathematical ideas because you meet them in context, use them to answer concrete questions, and build understanding one problem at a time.
                </p>
            </section>
        </div>
    </Page>
);

const ArticleSection = ({ title, eyebrow, children }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-7">
        {eyebrow && <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">{eyebrow}</p>}
        <h2 className="text-xl font-bold tracking-tight text-[var(--theme-text)] sm:text-2xl">{title}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">{children}</div>
    </section>
);

const MathCard = ({ title, example }) => (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-4">
        <h3 className="font-bold text-[var(--theme-text)]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-text-secondary)]">{example}</p>
    </div>
);

const Callout = ({ children }) => (
    <p className="rounded-xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-4 font-semibold text-[var(--theme-text)]">{children}</p>
);

const Code = ({ children }) => <code className="rounded bg-[var(--theme-surface-raised)] px-1.5 py-0.5 font-mono text-[0.92em] text-[var(--theme-accent)]">{children}</code>;

const Page = ({ label, title, subtitle, children }) => (
    <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs text-[var(--theme-accent)]">{label}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--theme-text-secondary)]">{subtitle}</p>
        <div className="mt-10">{children}</div>
    </section>
);

export default CPSkills;
