import React from "react";


const CPRealStories = () => {

    return (
        <Page
            label="cp / real stories"
            title="Real CP Stories"
            subtitle="Learn from experiences shared by programmers and students in the wider CP community."
        >

            <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">

                <h2 className="text-xl font-semibold">
                    Learn from the community
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    Competitive programming has a large community
                    sharing contest experiences, learning paths,
                    problem-solving approaches and career experiences.
                </p>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

                <Story
                    platform="LinkedIn"
                    title="Student experiences"
                    text="Posts describing how students approached CP, contests and technical preparation."
                />

                <Story
                    platform="Codeforces"
                    title="Contest experiences"
                    text="Contest blogs and discussions can show how experienced participants think about problems."
                />

                <Story
                    platform="CodeChef"
                    title="Community discussions"
                    text="Discussions can expose beginners to different practice methods and problem-solving approaches."
                />

                <Story
                    platform="Personal Blogs"
                    title="Learning journeys"
                    text="Developers and students sometimes document their progress and lessons learned."
                />

            </div>


            <div className="mt-8 rounded-xl border border-[#1C2734] bg-[#080D14] p-6">

                <p className="text-sm leading-7 text-[#AEB9C7]">
                    When CpHub adds external community posts, each
                    post should link back to the original source and
                    clearly identify the author and platform.
                </p>

            </div>

        </Page>
    );
};


const Story = ({
    platform,
    title,
    text
}) => (
    <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5">

        <p className="font-mono text-xs uppercase tracking-wider text-[#4AFFC4]">
            {platform}
        </p>

        <h3 className="mt-3 font-semibold">
            {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
            {text}
        </p>

        <button
            type="button"
            className="mt-4 font-mono text-xs text-[#4AFFC4]"
        >
            read stories →
        </button>

    </div>
);


const Page = ({
    label,
    title,
    subtitle,
    children
}) => (
    <section className="mx-auto max-w-5xl">

        <p className="font-mono text-xs text-[#4AFFC4]">
            {label}
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            {title}
        </h1>

        <p className="mt-4 max-w-3xl text-[#AEB9C7]">
            {subtitle}
        </p>

        <div className="mt-10">
            {children}
        </div>

    </section>
);


export default CPRealStories;