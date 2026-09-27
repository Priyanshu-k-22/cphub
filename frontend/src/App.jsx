import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import Contests from "./pages/Contests.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Team from "./pages/Team.jsx";
import Achievements from "./pages/Achievements.jsx";
import Gallery from "./pages/Gallery.jsx";

import CP from "./pages/CP.jsx";
import CPSheet from "./pages/CPSheet";

import Problems from "./pages/Problems.jsx";
import ProblemDetails from "./pages/ProblemDetails.jsx";
import ProblemHistory from "./pages/ProblemHistory.jsx";

import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";

import UserDashboard from "./components/dashboard/UserDashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import DSARoadmap from "./pages/DSARoadmap.jsx";
import DSAPractice from "./pages/DSAPractice.jsx";
import DSA from "./pages/DSA.jsx";
import DSASheets from "./pages/DSASheets.jsx";
import Resources from "./pages/Resources.jsx";
import ResourcesDSA from "./pages/ResourcesDSA.jsx";
import ResourcesCP from "./pages/ResourcesCP.jsx";
import ResourcesWeb from "./pages/ResourcesWeb.jsx";

const AppLayout = () => {

    const [menuOpen, setMenuOpen] =
        useState(false);


    return (
        <div className="min-h-screen overflow-x-hidden bg-[#060A10] text-[#EDF2F7]">

            {/* =================================================
                MAIN APPLICATION
            ================================================= */}

            <div
                className={`
                    min-h-screen
                    transition-[margin-right]
                    duration-300
                    ease-in-out
                    ${menuOpen
                        ? "mr-[280px]"
                        : "mr-0"
                    }
                `}
            >

                <Navbar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />


                <main>
                    <Routes>

                        {/* ================================
                            PUBLIC PAGES
                        ================================= */}

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/events"
                            element={<Events />}
                        />

                        <Route
                            path="/contests"
                            element={<Contests />}
                        />

                        <Route
                            path="/leaderboard"
                            element={<Leaderboard />}
                        />

                        <Route
                            path="/team"
                            element={<Team />}
                        />

                        <Route
                            path="/achievements"
                            element={<Achievements />}
                        />

                        <Route
                            path="/gallery"
                            element={<Gallery />}
                        />

                        <Route
                            path="/cp"
                            element={<CP />}
                        />

                        <Route
                            path="/resources"
                            element={<Resources />}
                        />
                        <Route
                            path="/resources/dsa"
                            element={<ResourcesDSA />}
                        />
                        <Route
                            path="/resources/cp"
                            element={<ResourcesCP />}
                        />

                        <Route
                            path="/resources/web-development"
                            element={<ResourcesWeb />}
                        />


                        {/* ================================
                            AUTHENTICATION
                        ================================= */}

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />


                        {/* ================================
                            PROTECTED PAGES
                        ================================= */}

                        <Route
                            element={
                                <ProtectedRoute />
                            }
                        >

                            <Route
                                path="/dashboard"
                                element={
                                    <UserDashboard />
                                }
                            />

                            <Route
                                path="/problems"
                                element={
                                    <Problems />
                                }
                            />

                            <Route
                                path="/problems/history"
                                element={
                                    <ProblemHistory />
                                }
                            />

                            <Route
                                path="/problems/:id"
                                element={
                                    <ProblemDetails />
                                }
                            />

                            <Route
                                path="/cp-sheet"
                                element={<CPSheet />}
                            />

                            <Route
                                path="/dsa/roadmap"
                                element={<DSARoadmap />}
                            />



                            <Route
                                path="/dsa/practice"
                                element={<DSAPractice />}
                            />

                            <Route
                                path="/dsa"
                                element={<DSA />}
                            />

                            <Route
                                path="/dsa/sheets"
                                element={<DSASheets />}
                            />




                        </Route>

                    </Routes>
                </main>

            </div>


            {/* =================================================
                RIGHT SIDE MENU
            ================================================= */}

            <SideMenu
                menuOpen={menuOpen}
            />

        </div>
    );
};


/* ============================================================
   SIDE MENU
============================================================ */

const SideMenu = ({
    menuOpen
}) => {

    const navigate = useNavigate();
    
    const {
        isAuthenticated,
        loading,
        logout
    } = useAuth();


    const menuLinks = [
        {
            name: "About",
            path: "/about",
        },
        {
            name: "Events",
            path: "/events",
        },
        {
            name: "Leaderboard",
            path: "/leaderboard",
        },
        {
            name: "Achievements",
            path: "/achievements",
        },
        {
            name: "Gallery",
            path: "/gallery",
        },
        {
            name: "Our Team",
            path: "/team",
        },
        {
            name: "Interview Blogs",
            path: "/interview-blogs",
        },
        {
            name: "System Design",
            path: "/system-design",
        },
        {
            name: "Must Know",
            path: "/must-know",
        },
        {
            name: "Miscellaneous",
            path: "/miscellaneous",
        },
        {
            name: "DSA",
            path: "/dsa/roadmap",
        },

        {
            name: "Resources",
            path: "/resources",
        },

        {
            name: "DSA",
            path: "/dsa",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    const handleLogout = async () => {

        await logout();
        navigate("/", {
            replace: true
        });

    };


    return (

        <aside
            className={`
                fixed
                right-0
                top-0
                z-[60]
                h-screen
                w-[280px]
                border-l
                border-[#1C2734]
                bg-[#080D14]
                shadow-[-15px_0_35px_rgba(0,0,0,0.25)]
                transition-transform
                duration-300
                ease-in-out

                ${
                    menuOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }
            `}
        >

            <div className="flex h-full flex-col">


                {/* =================================================
                    MENU HEADER
                ================================================= */}

                <div
                    className="
                        border-b
                        border-[#1C2734]
                        px-5
                        py-5
                    "
                >

                    <p
                        className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-[#556275]
                        "
                    >
                        navigation
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-semibold
                            text-white
                        "
                    >
                        More
                    </h2>

                </div>


                {/* =================================================
                    MENU ITEMS
                ================================================= */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-3
                        py-4
                    "
                >

                    <div className="space-y-1">

                        {menuLinks.map(
                            (link) => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="
                                        block
                                        rounded-lg
                                        px-3
                                        py-3
                                        text-sm
                                        text-[#AEB9C7]
                                        transition
                                        duration-200
                                        hover:bg-[#111923]
                                        hover:text-[#4AFFC4]
                                    "
                                >
                                    {link.name}
                                </Link>

                            )
                        )}

                    </div>

                </nav>


                {/* =================================================
                    AUTH BUTTON
                ================================================= */}

                <div
                    className="
                        border-t
                        border-[#1C2734]
                        p-4
                    "
                >

                    {/* =================================================
                        LOGGED IN → LOGOUT
                    ================================================= */}

                    {!loading && isAuthenticated && (

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-red-500/20
                                bg-red-500/5
                                px-4
                                py-3
                                text-left
                                font-mono
                                text-sm
                                text-red-400
                                transition-all
                                duration-200
                                hover:border-red-500/40
                                hover:bg-red-500/10
                                hover:text-red-300
                            "
                        >
                            Logout
                        </button>

                    )}


                    {/* =================================================
                        LOGGED OUT → LOGIN
                    ================================================= */}

                    {!loading && !isAuthenticated && (

                        <Link
                            to="/login"
                            className="
                                block
                                w-full
                                rounded-lg
                                border
                                border-[#4AFFC4]/30
                                bg-[#4AFFC4]/5
                                px-4
                                py-3
                                text-left
                                font-mono
                                text-sm
                                font-medium
                                text-[#4AFFC4]
                                transition-all
                                duration-200
                                hover:border-[#4AFFC4]
                                hover:bg-[#4AFFC4]/10
                            "
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </aside>
    );
};


export default function App() {

    return (
        <AuthProvider>

            <BrowserRouter>

                <AppLayout />

            </BrowserRouter>

        </AuthProvider>
    );
}