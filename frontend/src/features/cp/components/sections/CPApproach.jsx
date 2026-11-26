import React from "react";

const CPApproach = () => (
    <Page
        label="cp / problem solving"
        title="How to Approach a Problem"
        subtitle="A reliable process for turning an unfamiliar statement into a solution you understand, trust, and can implement."
    >
        <div className="space-y-6">
            <section className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">Start with a scenario</p>
                <h2 className="mt-3 text-2xl font-bold">A problem you have never seen before</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    You open a contest problem. The story is unfamiliar, the examples are small, and you do not immediately see the trick. Your first instinct is to start coding. Pause. The goal is not to guess the intended algorithm; it is to build a solution from what the statement tells you.
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    Imagine the task says: “Given a list of numbers, determine whether any number appears more than once.” You could compare every number with every other number. That is a valid first thought. But will it be fast enough for the input size? This question leads you through the same reasoning process used on much harder problems.
                </p>
            </section>

            <Step number="01" title="Read for the actual task">
                <p>First separate the story from the requirement. Rewrite the task in one plain sentence:</p>
                <Callout>Given a list of integers, answer YES if a value occurs at least twice; otherwise answer NO.</Callout>
                <p>Identify exactly what the program receives and what it must produce. Look for details such as whether there are multiple test cases, whether the list can be empty, whether values can be negative, and whether the answer is one word, a number, or a constructed object.</p>
                <p>Do not assume details the statement has not given you. A sample illustrates the format; it does not define all possible inputs.</p>
            </Step>

            <Step number="02" title="Understand the examples by hand">
                <p>For the list <Code>4 7 2 7 9</Code>, the answer is YES because 7 appears twice. For <Code>1 3 5</Code>, the answer is NO because every value appears once.</p>
                <p>Now make your own small examples. Try a single item, all equal values, negative values, duplicates at the beginning and end, and a long list with no duplicate. Working through these examples helps expose hidden assumptions before you write code.</p>
            </Step>

            <Step number="03" title="Read the constraints—they describe the scale">
                <p>Suppose the statement says <Code>1 ≤ n ≤ 100,000</Code>. Here, <Code>n</Code> is the number of values. Constraints are not decoration: they tell you how large the test can be and help you judge whether an approach is practical.</p>
                <p>Also inspect value ranges and memory limits. A list of one hundred thousand small integers is different from one hundred million large objects. Constraints can suggest whether you need a faster algorithm, a particular data structure, or careful memory use.</p>
            </Step>

            <Step number="04" title="Think of a straightforward solution first">
                <p>Compare every pair of positions. If two values match, a duplicate exists. If no pair matches after checking every pair, there is no duplicate.</p>
                <CodeBlock>{`for each i from 0 to n - 1:
    for each j from i + 1 to n - 1:
        if values[i] == values[j]:
            answer YES
answer NO`}</CodeBlock>
                <p>This is useful because it is easy to explain and provides a reference point. A simple solution can reveal what the task means even when it is too slow to submit.</p>
            </Step>

            <Step number="05" title="Estimate the work before coding">
                <p>The pairwise method checks roughly <Code>n × (n - 1) / 2</Code> pairs. If <Code>n = 100,000</Code>, that is about five billion comparisons. That is likely too much for a typical contest time limit.</p>
                <p>We describe this growth as <Code>O(n²)</Code>, read “order n squared.” Big-O is not an exact runtime in seconds; it describes how the amount of work grows as the input grows. Doubling <Code>n</Code> roughly quadruples an <Code>O(n²)</Code> method’s work.</p>
                <p>A linear scan, <Code>O(n)</Code>, grows more gently: doubling the input roughly doubles the work. This is why the same correct answer can be accepted or rejected depending on the approach.</p>
            </Step>

            <Step number="06" title="Look for information you can reuse">
                <p>As you scan the list from left to right, remember the values already seen. Before processing the current value, check whether it is already in that collection. If it is, you found a duplicate. Otherwise, add it and continue.</p>
                <CodeBlock>{`seen = empty set
for each value x:
    if x is in seen:
        answer YES
    add x to seen
answer NO`}</CodeBlock>
                <p>A set is a data structure designed to keep distinct values and check membership efficiently on average. This approach takes <Code>O(n)</Code> expected time and <Code>O(n)</Code> extra memory.</p>
                <p>There may be other solutions. Sorting the values and checking neighboring pairs takes <Code>O(n log n)</Code> time and may use less extra memory depending on how sorting is done. Different approaches have different trade-offs.</p>
            </Step>

            <Step number="07" title="Explain why the idea is correct">
                <p>Before implementation, convince yourself that the method cannot miss an answer or report one incorrectly.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    <MiniCard title="If the algorithm says YES">The current value was already in <Code>seen</Code>. That means an earlier position contained the same value, so a duplicate really exists.</MiniCard>
                    <MiniCard title="If a duplicate exists">When the second copy is reached, the first copy has already been added to <Code>seen</Code>. The membership check finds it, so the algorithm says YES.</MiniCard>
                </div>
                <p>If the scan ends without finding a repeated value, every item was different from the values before it. Therefore the correct answer is NO.</p>
            </Step>

            <Step number="08" title="Choose an implementation that fits">
                <p>Once the idea is clear, translate it into your language. Keep input, logic, and output straightforward. In C++, the standard library provides <Code>unordered_set</Code> for average constant-time membership checks.</p>
                <CodeBlock language="C++">{`#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    unordered_set<long long> seen;
    bool duplicate = false;

    for (int i = 0; i < n; ++i) {
        long long x;
        cin >> x;

        if (seen.count(x)) {
            duplicate = true;
        }
        seen.insert(x);
    }

    cout << (duplicate ? "YES\\n" : "NO\\n");
    return 0;
}`}</CodeBlock>
                <p>Notice the type <Code>long long</Code>: choose a type that can hold the full value range in the statement. The fast input/output lines are common in C++ contests, especially when input is large.</p>
            </Step>

            <Step number="09" title="Test cases that could break your code">
                <p>Do not only test the sample. Try cases that target assumptions and boundaries:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li><strong>Minimum size:</strong> one value, so there cannot be a duplicate.</li>
                    <li><strong>Immediate duplicate:</strong> <Code>5 5</Code>.</li>
                    <li><strong>Duplicate at the end:</strong> <Code>1 2 3 4 1</Code>.</li>
                    <li><strong>All distinct:</strong> <Code>-3 0 8 20</Code>.</li>
                    <li><strong>Negative and large values:</strong> check the input range and chosen numeric type.</li>
                    <li><strong>Maximum size:</strong> make sure the algorithm and memory use fit the constraints.</li>
                </ul>
                <p>Testing is not a substitute for reasoning, but it catches many implementation mistakes quickly.</p>
            </Step>

            <Step number="10" title="Submit, read the verdict, and respond">
                <p>An online judge runs your program on tests you cannot see. Treat the verdict as feedback about the result:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    <MiniCard title="Accepted">All judge tests passed. The solution met the expected behavior and limits for those tests.</MiniCard>
                    <MiniCard title="Wrong Answer">Some output was incorrect. Recheck interpretation, boundary cases, logic, and output format.</MiniCard>
                    <MiniCard title="Time Limit Exceeded">The program took too long. Revisit algorithm complexity, repeated work, and input/output cost.</MiniCard>
                    <MiniCard title="Runtime or Compilation Error">The program failed to run or compile. Inspect the error, syntax, array bounds, types, and invalid operations.</MiniCard>
                </div>
                <p>A rejected submission is not a verdict on your ability. It tells you which part of the process to inspect next. Make a small change, test the idea, and submit again when you understand what changed.</p>
            </Step>

            <section className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-surface)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">Your repeatable checklist</p>
                <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                    {["Restate the task in plain words", "Understand samples and make your own cases", "Read input, value, and memory constraints", "Start with a direct idea", "Estimate its time and memory", "Improve it if the scale requires", "Explain why it is correct", "Implement carefully", "Test boundary cases", "Learn from the judge verdict"].map((item, index) => (
                        <li key={item} className="flex gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 text-sm leading-6 text-[var(--theme-text-secondary)]">
                            <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
                <p className="mt-5 text-sm leading-7 text-[var(--theme-text-secondary)]">
                    This process won’t reveal every solution instantly. It gives you a way to keep moving when you feel stuck: understand more precisely, test a smaller case, question the complexity, or look for information you can reuse. The goal is not to avoid getting stuck; it is to know what to try next.
                </p>
            </section>
        </div>
    </Page>
);

const Step = ({ number, title, children }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-7">
        <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent-soft)] font-mono text-xs font-bold text-[var(--theme-accent)]">{number}</span>
            <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold tracking-tight text-[var(--theme-text)] sm:text-2xl">{title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">{children}</div>
            </div>
        </div>
    </section>
);

const MiniCard = ({ title, children }) => (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-4">
        <h3 className="font-bold text-[var(--theme-text)]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-text-secondary)]">{children}</p>
    </div>
);

const Callout = ({ children }) => (
    <p className="rounded-xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-4 font-semibold text-[var(--theme-text)]">{children}</p>
);

const Code = ({ children }) => <code className="rounded bg-[var(--theme-surface-raised)] px-1.5 py-0.5 font-mono text-[0.92em] text-[var(--theme-accent)]">{children}</code>;

const CodeBlock = ({ language = "Pseudocode", children }) => (
    <div className="overflow-hidden rounded-xl border border-[var(--theme-border)] bg-[var(--theme-page)]">
        <div className="border-b border-[var(--theme-border)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--theme-text-muted)]">{language}</div>
        <pre className="overflow-x-auto p-4 text-xs leading-6 text-[var(--theme-text)] sm:text-sm"><code>{children}</code></pre>
    </div>
);

const Page = ({ label, title, subtitle, children }) => (
    <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs text-[var(--theme-accent)]">{label}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--theme-text-secondary)]">{subtitle}</p>
        <div className="mt-10">{children}</div>
    </section>
);

export default CPApproach;
