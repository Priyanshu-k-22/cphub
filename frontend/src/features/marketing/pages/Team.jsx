import React from "react";

import TeamSection from "../components/OurTeam.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

const Team = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main>
                <TeamSection />
            </main>

            <Footer />
        </div>
    );
};

export default Team;