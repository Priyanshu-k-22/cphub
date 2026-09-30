import React, { useState } from "react";

import CPSidebar from "../components/cp/CPSidebar";

import CPWhy from "../components/cp/sections/CPWhy";
import CPCareer from "../components/cp/sections/CPCareer";
import CPInterviews from "../components/cp/sections/CPInterviews";
import CPSkills from "../components/cp/sections/CPSkills";

import CPStartHere from "../components/cp/sections/CPStartHere";
import CPLearn from "../components/cp/sections/CPLearn";
import CPBasicPractice from "../components/cp/sections/CPBasicPractice";
import CPMath from "../components/cp/sections/CPMath";

import CPCodeforces from "../components/cp/sections/CPCodeforces";
import CPContests from "../components/cp/sections/CPContests";
import CPRating from "../components/cp/sections/CPRating";

import CPRealStories from "../components/cp/sections/CPRealStories";
import CPResources from "../components/cp/sections/CPResources";


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
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

            <div className="mx-auto flex max-w-[1500px] flex-col lg:flex-row">

                <CPSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />


                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 xl:px-12">

                    {renderSection()}

                </main>

            </div>

        </div>
    );
};


export default CP;
