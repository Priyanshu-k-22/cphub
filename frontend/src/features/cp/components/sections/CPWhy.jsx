import React from "react";

const CPWhy = () => (
    <Section
        label="cp / introduction"
        title="What Is Competitive Programming?"
        subtitle="A clear introduction to the activity, the contests, and how CP relates to DSA."
    >
        <div className="space-y-8">
            <ArticleSection title="The short answer">
                <p>
                    Competitive programming, often shortened to <strong>CP</strong>, is a form of programming competition where people solve algorithmic problems by writing code.
                </p>
                <p>
                    A problem setter gives participants a task. Each participant develops a program that meets the task’s requirements. In a contest, everyone works on a set of problems during the same fixed period, and their results are ranked according to the contest’s rules.
                </p>
                <p className="font-semibold text-[var(--theme-text)]">
                    Programmers compete by solving problems with code.
                </p>
            </ArticleSection>

            <ArticleSection title="Why is it called competitive?">
                <p>
                    Participants face the same problems, time limit, and rules. Their submissions are judged, and a scoreboard shows how they performed relative to others.
                </p>
                <p>
                    But taking part doesn’t have to be about beating everyone else. Many people practise without entering live contests, or use contests to measure their own progress and meet other problem-solvers.
                </p>
            </ArticleSection>

            <ArticleSection title="What kind of problems do people solve?">
                <p>
                    CP problems are designed so a program can produce an answer from the given input. They may involve arithmetic, patterns, strings, arrays, graphs, planning, or other mathematical and computational ideas.
                </p>
                <p>
                    Some problems are short and direct. Others require a less obvious idea. A contest can bring several different kinds of problems together, so participants need a broad and flexible way of thinking.
                </p>
            </ArticleSection>

            <ArticleSection title="Where does it happen?">
                <p>
                    Online platforms host contests and archives of problems. Participants can compete from different places, often at the same time.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                    <PlatformLink href="https://codeforces.com/">Codeforces</PlatformLink>
                    <PlatformLink href="https://atcoder.jp/">AtCoder</PlatformLink>
                    <PlatformLink href="https://www.codechef.com/">CodeChef</PlatformLink>
                    <PlatformLink href="https://icpc.global/">ICPC</PlatformLink>
                </div>
                <p>
                    There are individual contests as well as team competitions. The International Collegiate Programming Contest (ICPC) is a well-known university-level team competition.
                </p>
            </ArticleSection>

            <ArticleSection title="Is CP just about speed?">
                <p>
                    Time matters in many contests, but CP is not simply typing quickly. Participants need to understand the task, develop a solution that meets its requirements, and express that solution as a program.
                </p>
                <p>
                    Different contests reward different strengths: careful implementation, mathematical insight, algorithm knowledge, creativity, and judgment about which problems to attempt. A fast coder without a sound solution will not get far.
                </p>
            </ArticleSection>

            <ArticleSection title="How does CP relate to DSA?">
                <p>
                    <strong>DSA</strong> stands for <strong>Data Structures and Algorithms</strong>. It is a body of computer science knowledge: ways to organize data and methods for solving computational problems.
                </p>
                <p>
                    <strong>CP is a competitive activity.</strong> Participants draw on DSA, mathematics, programming, and logical reasoning to solve contest problems. DSA is an important part of CP, but the two terms do not mean the same thing.
                </p>
                <div className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)] p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">A useful way to think about it</p>
                    <p className="mt-2 text-lg font-bold text-[var(--theme-text)]">DSA is knowledge you learn. CP is one setting where you apply it.</p>
                </div>
                <p>
                    The same DSA concepts are used in software development, interviews, research, and many other areas. CP gives people a structured, competitive way to explore and practise problem-solving with code.
                </p>
            </ArticleSection>

            <ArticleSection title="A field with room to grow">
                <p>
                    People take part for different reasons. Some enjoy the intellectual challenge. Some like the contest atmosphere and the satisfaction of improving. Others value the chance to practise algorithmic thinking, connect with a global community, or demonstrate strong problem-solving ability.
                </p>
                <p>
                    At the highest levels are remarkable competitors such as Gennady Korotkevich, known as <strong>tourist</strong>, and India’s Shreyan Ray, known as <strong>Dominator</strong>. Their achievements show the heights of the field, but CP is not only for future champions. People can enjoy and benefit from participating at every level.
                </p>
            </ArticleSection>

            <div className="rounded-2xl border border-[var(--theme-accent)]/25 bg-[var(--theme-surface)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">In one sentence</p>
                <h2 className="mt-3 text-xl font-bold leading-8 text-[var(--theme-text)] sm:text-2xl">
                    Competitive programming is the practice of competing with code: participants solve programming problems under shared rules, often in a timed contest.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--theme-text-secondary)]">
                    Now that you know what CP is, the next question is: why might you want to try it?
                </p>
            </div>
        </div>
    </Section>
);

const ArticleSection = ({ title, children }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-7">
        <h2 className="text-xl font-bold tracking-tight text-[var(--theme-text)] sm:text-2xl">{title}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
            {children}
        </div>
    </section>
);

const PlatformLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-2 text-sm font-semibold text-[var(--theme-accent)] transition hover:border-[var(--theme-accent)]/40"
    >
        {children}<span aria-hidden="true"> ↗</span>
    </a>
);

const Section = ({ label, title, subtitle, children }) => (
    <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs text-[var(--theme-accent)]">{label}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--theme-text-secondary)]">{subtitle}</p>
        <div className="mt-10">{children}</div>
    </section>
);

export default CPWhy;
