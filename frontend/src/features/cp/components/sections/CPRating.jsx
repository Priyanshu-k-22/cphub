import React from "react";


const CPRating = () => {

    return (
        <Page
            label="cp / rating"
            title="Rating & Rankings"
            subtitle="Understand what a competitive-programming rating actually means before you start worrying about it."
        >

            <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6 md:p-8">

                <h2 className="text-2xl font-semibold">
                    Rating is feedback, not identity.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#AEB9C7]">
                    Competitive-programming platforms use rating
                    systems to represent contest performance.
                    Your rating can move up or down after contests.
                </p>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

                <Card
                    title="Rating can go down"
                    text="A lower rating after a contest does not mean you stopped learning."
                />

                <Card
                    title="Rating can go up"
                    text="An increase can indicate improved contest performance, but it is only one signal."
                />

                <Card
                    title="Different contests differ"
                    text="Contest difficulty, participants and your performance all affect the result."
                />

                <Card
                    title="Career is broader"
                    text="Career development involves many skills beyond competitive-programming rating."
                />

            </div>


            <div className="mt-8 rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <h3 className="font-semibold">
                    Compete honestly
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#AEB9C7]">
                    Participate honestly, learn from your performance,
                    and use contests as a way to improve. A rating is
                    useful feedback, but it should not determine how
                    you value your progress.
                </p>

            </div>

        </Page>
    );
};


const Card = ({ title, text }) => (
    <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5">

        <h3 className="font-semibold">
            {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
            {text}
        </p>

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


export default CPRating;