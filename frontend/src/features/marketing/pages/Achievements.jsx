import React from "react";


import AchievementsSection from "../components/Achievements.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

const Achievements = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main>
                <AchievementsSection />
            </main>

            <Footer />
        </div>
    );
};

export default Achievements;