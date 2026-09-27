import React, { useEffect, useState } from "react";
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
import Profile from "./pages/Profile.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import DSARoadmap from "./pages/DSARoadmap.jsx";
import DSAPractice from "./pages/DSAPractice.jsx";
import DSA from "./pages/DSA.jsx";
import DSASheets from "./pages/DSASheets.jsx";
import Resources from "./pages/Resources.jsx";
import ResourcesDSA from "./pages/ResourcesDSA.jsx";
import ResourcesCP from "./pages/ResourcesCP.jsx";
import ResourcesWeb from "./pages/ResourcesWeb.jsx";

//Admin

import AdminDashboard
    from "./pages/admin/AdminDashboard";

import DailyProblems
    from "./pages/admin/dailyProblems/DailyProblems";

import CPSheetAdmin
    from "./pages/admin/cpSheet/CPSheetAdmin";

import DSASheetAdmin
    from "./pages/admin/dsaSheet/DSASheetAdmin";

import ContestsAdmin
    from "./pages/admin/contests/ContestsAdmin";

import CTCAdmin
    from "./pages/admin/ctc/CTCAdmin";

import InterviewAdmin
    from "./pages/admin/interview/InterviewAdmin";

import SystemDesignAdmin
    from "./pages/admin/systemDesign/SystemDesignAdmin";

import MiscellaneousAdmin
    from "./pages/admin/miscellaneous/MiscellaneousAdmin";

import UsersAdmin
    from "./pages/admin/users/UsersAdmin";

import UserActivity
    from "./pages/admin/users/UserActivity";

import UserProgress
    from "./pages/admin/users/UserProgress";

import UserProfile
    from "./pages/admin/users/UserProfile";

import AdminSettings
    from "./pages/admin/settings/AdminSettings";

const RoleDashboard = () => {
    const { user } = useAuth();
    return user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

const AppLayout = () => {

    const [menuOpen, setMenuOpen] =
        useState(false);
    const [brightMode, setBrightMode] = useState(() => {
        try {
            return window.localStorage.getItem("cphub-theme") === "light";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        const theme = brightMode ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        try {
            window.localStorage.setItem("cphub-theme", theme);
        } catch {
            // The selected theme still applies for this session when storage is unavailable.
        }
    }, [brightMode]);

    const toggleTheme = () => setBrightMode((current) => !current);

    return (
        <div
            className="app-theme flex min-h-screen w-full overflow-x-hidden bg-[#060A10] text-[#EDF2F7]"
            data-theme={brightMode ? "light" : "dark"}
        >

            {/* =================================================
                MAIN APPLICATION
            ================================================= */}

            <div
                className="app-page min-h-screen min-w-0 flex-1 overflow-x-hidden"
            >
                <Navbar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    brightMode={brightMode}
                    onToggleTheme={toggleTheme}
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
                                element={<RoleDashboard />}
                            />

                            <Route
                                path="/profile"
                                element={<Profile />}
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
                            <Route element={<ProtectedRoute requireAdmin />}>
                            <Route
                                path="/admin/dashboard"
                                element={<AdminDashboard />}
                            />

                            <Route
                                path="/admin/daily-problems"
                                element={<DailyProblems />}
                            />

                            <Route
                                path="/admin/cp-sheet"
                                element={<CPSheetAdmin />}
                            />

                            <Route
                                path="/admin/dsa-sheet"
                                element={<DSASheetAdmin />}
                            />

                            <Route
                                path="/admin/contests"
                                element={<ContestsAdmin />}
                            />

                            <Route
                                path="/admin/ctc"
                                element={<CTCAdmin />}
                            />

                            <Route
                                path="/admin/interview"
                                element={<InterviewAdmin />}
                            />

                            <Route
                                path="/admin/system-design"
                                element={<SystemDesignAdmin />}
                            />

                            <Route
                                path="/admin/miscellaneous"
                                element={<MiscellaneousAdmin />}
                            />

                            <Route
                                path="/admin/users"
                                element={<UsersAdmin />}
                            />

                            <Route
                                path="/admin/users/:userId"
                                element={<UserProfile />}
                            />

                            <Route
                                path="/admin/activity"
                                element={<UserActivity />}
                            />

                            <Route
                                path="/admin/progress"
                                element={<UserProgress />}
                            />

                            <Route
                                path="/admin/settings"
                                element={<AdminSettings />}
                            />
                            </Route>

                        </Route>

                    </Routes>
                </main>

            </div>


            {/* =================================================
                RIGHT SIDE MENU
            ================================================= */}

            <SideMenu
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                brightMode={brightMode}
            />

        </div>
    );
};


/* ============================================================
   SIDE MENU
============================================================ */

const SideMenu = ({
    menuOpen,
    setMenuOpen,
    brightMode
}) => {

    const navigate = useNavigate();

    const {
        isAuthenticated,
        loading,
        logout,
        user
    } = useAuth();

    const avatarUrl = user?.profile?.avatar;
    const [avatarFailed, setAvatarFailed] = useState(false);

    useEffect(() => {
        setAvatarFailed(false);
    }, [avatarUrl]);


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
        setMenuOpen(false);
        navigate("/", {
            replace: true
        });

    };

    const closeMenu = () => {
        setMenuOpen(false);
        window.requestAnimationFrame(() => {
            document.querySelector('[aria-controls="site-navigation-drawer"]')?.focus();
        });
    };

    useEffect(() => {
        if (!menuOpen) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeMenu();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);


    return (

        <aside
            id="site-navigation-drawer"
            className={`
        sticky
        top-0
        z-[60]
        h-screen
        shrink-0
        overflow-hidden
        border-l
        shadow-[-15px_0_35px_rgba(0,0,0,0.12)]
        transition-[width,background-color,border-color]
        duration-300
        ease-in-out

        ${brightMode
                    ? "border-gray-200 bg-white"
                    : "border-[#1C2734] bg-[#080D14]"
                }

        ${menuOpen
                    ? "border-l"
                    : "border-l-0"
                }
    `}
            aria-hidden={!menuOpen}
            inert={menuOpen ? undefined : ""}
            style={{ width: menuOpen ? "min(280px, 42vw)" : "0px" }}
        >

            <div className="flex h-full flex-col">


                {/* =================================================
                    MENU HEADER
                ================================================= */}

                <div
                    className={`
    flex
    items-start
    justify-between
    border-b
    px-5
    py-5
    ${brightMode
                            ? "border-gray-200"
                            : "border-[#1C2734]"
                        }
`}
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

                    <div>
                        <h2
                            className={`
        mt-1
        text-xl
        font-semibold
        ${brightMode
                                ? "text-gray-900"
                                : "text-white"
                            }
    `}
                        >
                            More
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xl leading-none transition ${brightMode
                            ? "border-gray-200 text-gray-600 hover:bg-gray-100"
                            : "border-[#1C2734] text-[#AEB9C7] hover:bg-[#111923] hover:text-white"
                            }`}
                    >
                        ×
                    </button>

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
                                    onClick={closeMenu}
                                    className={`
    block
    rounded-lg
    px-3
    py-3
    text-sm
    transition
    duration-200

    ${brightMode
                                            ? "text-gray-600 hover:bg-gray-100 hover:text-[#4AFFC4]"
                                            : "text-[#AEB9C7] hover:bg-[#111923] hover:text-[#4AFFC4]"
                                        }
`}
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
                    className={`
    border-t
    p-4
    ${brightMode
                            ? "border-gray-200"
                            : "border-[#1C2734]"
                        }
`}
                >

                    {/* =================================================
                        LOGGED IN → LOGOUT
                    ================================================= */}

                    {!loading && isAuthenticated && (
                        <>
                                <Link
                                    to="/profile"
                            onClick={closeMenu}
                            className={`mb-3 flex items-center gap-3 rounded-xl border p-3 transition ${brightMode
                                ? "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50"
                                : "border-[#1C2734] bg-[#0A1018] hover:border-[#4AFFC4]/40 hover:bg-[#111923]"
                                }`}
                        >
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border font-display text-sm font-semibold ${brightMode
                                ? "border-emerald-200 bg-emerald-100 text-emerald-800"
                                : "border-[#1C2734] bg-[#10201B] text-[#4AFFC4]"
                                }`}>
                                {avatarUrl && !avatarFailed ? (
                                    <img
                                        src={avatarUrl}
                                        alt=""
                                        className="h-full w-full object-cover"
                                        onError={() => setAvatarFailed(true)}
                                    />
                                ) : (
                                    user?.username?.charAt(0)?.toUpperCase() || "U"
                                )}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className={`block truncate text-sm font-semibold ${brightMode ? "text-gray-900" : "text-[#EDF2F7]"}`}>
                                    {user?.username || "Your profile"}
                                </span>
                                <span className={`mt-0.5 block text-xs ${brightMode ? "text-gray-600" : "text-[#7F8B9C]"}`}>
                                    View and edit profile
                                </span>
                            </span>
                            <span aria-hidden="true" className={brightMode ? "text-gray-500" : "text-[#556275]"}>›</span>
                        </Link>

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
                        </>
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
