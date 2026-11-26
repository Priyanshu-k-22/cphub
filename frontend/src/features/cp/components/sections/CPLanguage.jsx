import React from "react";

const CPLanguage = () => (
    <Page
        label="cp / language"
        title="Which Language Should You Use for CP?"
        subtitle="C++, Java, and Python can all be used for competitive programming. The right choice depends on what you know, what you value, and the contest constraints."
    >
        <div className="space-y-6">
            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 sm:p-8">
                <h2 className="text-2xl font-bold">Why is C++ so common in competitive programming?</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    C++ is a compiled language. A compiler translates your program into native machine code before it runs. With an optimizing compiler, this often lets straightforward, well-written C++ handle large amounts of computation quickly. C++ also has a powerful standard library, including containers and algorithms that are useful in contests.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    You may hear the rule of thumb that C++ can do around <strong className="text-[var(--theme-text)]">10⁸ simple operations in about a second</strong>. Treat that only as a rough estimate, not a promise: hardware, compiler optimizations, memory access, the exact operation, and the judge’s time limit all matter.
                </p>
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 sm:p-8">
                <h2 className="text-2xl font-bold">A practical comparison</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--theme-text-secondary)]">
                    These are contest-time intuitions for simple, repeated operations—not fixed language speeds. “An operation” can mean very different amounts of work, so always consider the algorithm and the actual contest limits.
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--theme-border)]">
                    <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                        <thead className="bg-[var(--theme-surface-raised)] text-[var(--theme-text)]">
                            <tr>
                                <th className="px-4 py-3 font-bold">Language</th>
                                <th className="px-4 py-3 font-bold">How it runs</th>
                                <th className="px-4 py-3 font-bold">Rough simple-loop intuition</th>
                                <th className="px-4 py-3 font-bold">Typical appeal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--theme-border)] text-[var(--theme-text-secondary)]">
                            <tr>
                                <th className="px-4 py-4 font-semibold text-[var(--theme-text)]">C++</th>
                                <td className="px-4 py-4">Usually compiled to native machine code before execution</td>
                                <td className="px-4 py-4">Often around 10⁸ very simple operations/second as a rough estimate</td>
                                <td className="px-4 py-4">Speed, control, and a widely used contest library</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-4 font-semibold text-[var(--theme-text)]">Java</th>
                                <td className="px-4 py-4">Compiled to bytecode; the JVM runs it and may JIT-compile hot code</td>
                                <td className="px-4 py-4">Can also handle many 10⁸-scale simple loops; JVM warm-up and task details matter</td>
                                <td className="px-4 py-4">Readable syntax, strong libraries, and automatic memory management</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-4 font-semibold text-[var(--theme-text)]">Python</th>
                                <td className="px-4 py-4">Common implementations run bytecode through an interpreter</td>
                                <td className="px-4 py-4">A simple Python loop is often substantially slower; 10⁶–10⁷ iterations may already be a useful caution zone</td>
                                <td className="px-4 py-4">Concise, beginner-friendly syntax and fast development</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs leading-5 text-[var(--theme-text-muted)]">
                    Java is not simply “slow”: modern JVMs use just-in-time compilation, and Java often performs well in contests. Python’s implementation details also vary; CPython, for example, compiles source to bytecode and executes it with its interpreter.
                </p>
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 sm:p-8">
                <h2 className="text-2xl font-bold">What if a problem has 10⁸ items?</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    Imagine a problem where you must scan a list of 100 million integers once. A single linear pass is an O(n) algorithm. Optimized C++ may finish such a pass within a contest time limit, depending on input and machine. Java may also pass; a simple Python loop over the same amount of data is much more likely to exceed the limit.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    That does <strong className="text-[var(--theme-text)]">not</strong> mean the problem is impossible in every language except C++. The answer depends on the actual work, implementation, input/output cost, runtime allowance, and whether the platform gives a language extra time. Sometimes a better algorithm makes the difference; sometimes C++ is the practical choice for a tight limit.
                </p>
                <div className="mt-5 rounded-xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-5">
                    <p className="text-sm font-bold text-[var(--theme-text)]">The key lesson</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--theme-text-secondary)]">
                        Constraints describe the task’s scale. They don’t declare that one language always passes and another always fails. Check the platform’s limits and choose an efficient algorithm first.
                    </p>
                </div>
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 sm:p-8">
                <h2 className="text-2xl font-bold">Why do contest setters often use C++?</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    C++ is popular among contestants and problem setters because its performance is predictable for many low-level, computation-heavy tasks, and its standard library is a familiar contest toolkit. Setters often benchmark intended solutions in C++ when choosing constraints and time limits.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    That is a community convention, not a rule that every problem is designed only for C++. Well-run platforms may account for differences between languages, and each problem’s statement and judge determine what is accepted.
                </p>
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 sm:p-8">
                <h2 className="text-2xl font-bold">So should everyone learn C++?</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    If you already know Python or Java, you can start CP with it. Familiarity helps you focus on problem-solving instead of learning a new language and its syntax at the same time. If you want to follow the most common Codeforces solutions and use a language that handles tight time limits well, C++ is a strong choice.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    C++ can take longer to learn and has more details to manage. Java offers a structured language with a large standard library. Python’s concise syntax makes it excellent for learning, automation, scripting, data analysis, and many AI and machine-learning workflows. Java is widely used in enterprise software, Android development, and large backend systems. C++ is also used well beyond contests, including systems software, game engines, and performance-critical applications.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                    No language is useless. They make different trade-offs and are valuable in different fields. Choose one that fits your goals, then learn another when your work calls for it.
                </p>
            </section>

            <div className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-surface)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">Quick takeaway</p>
                <p className="mt-3 text-lg font-bold leading-8 text-[var(--theme-text)] sm:text-xl">
                    C++ is a popular CP choice because compiled native code is fast and its contest ecosystem is mature. Java and Python remain capable choices—and are powerful tools in many other fields.
                </p>
            </div>
        </div>
    </Page>
);

const Page = ({ label, title, subtitle, children }) => (
    <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs text-[var(--theme-accent)]">{label}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--theme-text-secondary)]">{subtitle}</p>
        <div className="mt-10">{children}</div>
    </section>
);

export default CPLanguage;
