import React, { useState } from "react";

import CPSidebar from "../components/CPSidebar";

import CPWhy from "../components/sections/CPWhy";
import CPCareer from "../components/sections/CPCareer";
import CPInterviews from "../components/sections/CPInterviews";
import CPSkills from "../components/sections/CPSkills";

import CPStartHere from "../components/sections/CPStartHere";
import CPLearn from "../components/sections/CPLearn";
import CPBasicPractice from "../components/sections/CPBasicPractice";
import CPMath from "../components/sections/CPMath";

import CPCodeforces from "../components/sections/CPCodeforces";
import CPContests from "../components/sections/CPContests";
import CPRating from "../components/sections/CPRating";

import CPRealStories from "../components/sections/CPRealStories";
import CPResources from "../components/sections/CPResources";


const CP = () => {

    const [activeSection, setActiveSection] =
        useState("why");


    const renderSection = () => {

        switch (activeSection) {

            case "why":
                return <CPWhy />;

            case "career":
                return <CPCareer />;

            case "interviews":
                return <CPInterviews />;

            case "skills":
                return <CPSkills />;

            case "start":
                return <CPStartHere />;

            case "learn":
                return <CPLearn />;

            case "practice":
                return <CPBasicPractice />;

            case "math":
                return <CPMath />;

            case "codeforces":
                return <CPCodeforces />;

            case "contests":
                return <CPContests />;

            case "rating":
                return <CPRating />;

            case "stories":
                return <CPRealStories />;

            case "resources":
                return <CPResources />;

            default:
                return <CPStartHere />;
        }
    };


    return (
        <div className="min-h-screen bg-[var(--theme-page)] text-[var(--theme-text)]">

            <div className="mx-auto flex max-w-[1500px] flex-col lg:flex-row">

                <CPSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />


                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-9 xl:px-12">

                    <div className="cp-guide-content">{renderSection()}</div>

                </main>

            </div>

        </div>
    );
};


export default CP;
