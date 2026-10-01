import React from "react";


import EventsSection from "../components/Events.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

const Events = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">
 
            <main>
                <EventsSection />
            </main>

            <Footer />
        </div>
    );
};

export default Events;