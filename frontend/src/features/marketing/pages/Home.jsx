import React from "react";

import Hero from "../components/Hero.jsx";
import ClubIntro from "../components/ClubIntro.jsx";
import Vision from "../components/Vision.jsx";
import Mission from "../components/Mission.jsx";
import Stats from "../components/Stats.jsx";
import Join from "../components/Join.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

import CodeBackground from "../components/background/CodeBackground.jsx";


const Home = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">
            <CodeBackground variant="home"/>
            <div className="relative z-10">

            <main>
                <Hero />
                <ClubIntro />
                <Vision />
                <Mission />
                <Stats />
                <Join />
                <Contact />
            </main>

            <Footer />
            </div>
        </div>
    );
};

export default Home;