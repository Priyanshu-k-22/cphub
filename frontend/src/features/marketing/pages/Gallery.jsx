import React from "react";


import GallerySection from "../components/Gallery.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

const Gallery = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main>
                <GallerySection />
            </main>

            <Footer />
        </div>
    );
};

export default Gallery;