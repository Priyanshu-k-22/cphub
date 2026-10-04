import React, { useEffect, useRef, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import { useAuth } from "../features/auth/context/AuthContext.jsx";

import Navbar from "../shared/components/navigation/Navbar.jsx";

import Home from "../features/marketing/pages/Home.jsx";
import About from "../features/marketing/pages/About.jsx";
import Events from "../features/marketing/pages/Events.jsx";
import Contests from "../features/contests/pages/Contests.jsx";
import Leaderboard from "../features/leaderboard/pages/Leaderboard.jsx";
import Team from "../features/marketing/pages/Team.jsx";
import Achievements from "../features/marketing/pages/Achievements.jsx";
import Gallery from "../features/marketing/pages/Gallery.jsx";

import CP from "../features/cp/pages/CP.jsx";
import CPSheet from "../features/cp/pages/CPSheet";

import Problems from "../features/problems/pages/Problems.jsx";
import ProblemDetails from "../features/problems/pages/ProblemDetails.jsx";
import ProblemHistory from "../features/problems/pages/ProblemHistory.jsx";

import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";

import UserDashboard from "../features/dashboard/pages/UserDashboard.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoute.jsx";
import Profile from "../features/profile/pages/Profile.jsx";

import { AuthProvider } from "../features/auth/context/AuthContext.jsx";
import DSARoadmap from "../features/dsa/pages/DSARoadmap.jsx";
import DSAPractice from "../features/dsa/pages/DSAPractice.jsx";
import DSA from "../features/dsa/pages/DSA.jsx";
import DSASheets from "../features/dsa/pages/DSASheets.jsx";
import Resources from "../features/resources/pages/Resources.jsx";
import ResourcesDSA from "../features/resources/pages/ResourcesDSA.jsx";
import ResourcesCP from "../features/resources/pages/ResourcesCP.jsx";
import ResourcesWeb from "../features/resources/pages/ResourcesWeb.jsx";

//Admin

import AdminDashboard
    from "../features/admin/pages/AdminDashboard";

import DailyProblems
    from "../features/admin/pages/dailyProblems/DailyProblems";

import CPSheetAdmin
    from "../features/admin/pages/cpSheet/CPSheetAdmin";

import DSASheetAdmin
    from "../features/admin/pages/dsaSheet/DSASheetAdmin";
import DSAProblemsAdmin
    from "../features/admin/pages/dsaSheet/DSAProblemsAdmin";

import ContestsAdmin
    from "../features/admin/pages/contests/ContestsAdmin";

import CTCAdmin
    from "../features/admin/pages/ctc/CTCAdmin";

import InterviewAdmin
    from "../features/admin/pages/interview/InterviewAdmin";

import SystemDesignAdmin
    from "../features/admin/pages/systemDesign/SystemDesignAdmin";

import MiscellaneousAdmin
    from "../features/admin/pages/miscellaneous/MiscellaneousAdmin";

import UsersAdmin
    from "../features/admin/pages/users/UsersAdmin";

import UserActivity
    from "../features/admin/pages/users/UserActivity";

import UserProgress
    from "../features/admin/pages/users/UserProgress";

import UserProfile
    from "../features/admin/pages/users/UserProfile";

import AdminSettings
    from "../features/admin/pages/settings/AdminSettings";

    import AdminSettingsGeneral
    from "../features/admin/pages/settings/AdminSettingsGeneral";

import AdminSettingsAuthentication
    from "../features/admin/pages/settings/AdminSettingsAuthentication";

import AdminSettingsContent
    from "../features/admin/pages/settings/AdminSettingsContent";

import AdminSettingsContests
    from "../features/admin/pages/settings/AdminSettingsContests";

import AdminSettingsNotifications
    from "../features/admin/pages/settings/AdminSettingsNotifications";

import AdminSettingsSecurity
    from "../features/admin/pages/settings/AdminSettingsSecurity";

import SystemDesign from "../features/system-design/pages/SystemDesign.jsx";


import SystemDesignIntroduction from "../features/system-design/pages/SystemDesignIntroduction.jsx";
import SystemDesignWhy from "../features/system-design/pages/SystemDesignWhy.jsx";
import SystemDesignResources from "../features/system-design/pages/SystemDesignResources.jsx";

const RoleDashboard = () => {
    const { user } = useAuth();
    return user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

const AppLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const pageScrollRef = useRef(null);

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
        window.dispatchEvent(new Event("cphub-themechange"));
        try {
            window.localStorage.setItem("cphub-theme", theme);
        } catch {
            // The selected theme still applies for this session when storage is unavailable.
        }
    }, [brightMode]);

    useEffect(() => {
        const handleThemeToggle = () => setBrightMode((current) => !current);
        window.addEventListener("cphub-themetoggle", handleThemeToggle);
        return () => window.removeEventListener("cphub-themetoggle", handleThemeToggle);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isAdminRoute) pageScrollRef.current?.scrollTo({ top: 0, left: 0 });
    }, [location.pathname, isAdminRoute]);

    const toggleTheme = () => setBrightMode((current) => !current);

    return (
        <div
            className={`app-theme flex w-full bg-[#060A10] text-[#EDF2F7] ${isAdminRoute ? "min-h-screen overflow-x-hidden" : "h-screen overflow-hidden"}`}
            data-theme={brightMode ? "light" : "dark"}
        >

            {/* =================================================
                MAIN APPLICATION
            ================================================= */}

            <div
                ref={pageScrollRef}
                className={`app-page min-w-0 flex-1 overflow-x-hidden ${isAdminRoute ? "min-h-screen" : "h-screen min-h-0 overflow-y-auto overscroll-contain"}`}
            >
                {!isAdminRoute && <Navbar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    brightMode={brightMode}
                    onToggleTheme={toggleTheme}
                />}
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

                        <Route
                            path="/system-design"
                            element={<SystemDesign />}
                        />

                        <Route
                            path="/system-design/introduction"
                            element={<SystemDesignIntroduction />}
                        />

                        <Route
                            path="/system-design/why-system-design"
                            element={<SystemDesignWhy />}
                        />

                        <Route
                            path="/system-design/resources"
                            element={<SystemDesignResources />}
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
                                path="/dsa-sheet"
                                element={<DSAPractice />}
                            />

                            <Route
                                path="/dsa-sheet/:topicSlug"
                                element={<DSAPractice />}
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
                                path="/dsa/practice/:topicSlug"
                                element={<DSAPractice />}
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
                                    path="/admin/dsa-problems"
                                    element={<DSAProblemsAdmin />}
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

                                <Route
                                    path="/admin/settings/general"
                                    element={<AdminSettingsGeneral />}
                                />

                                <Route
                                    path="/admin/settings/authentication"
                                    element={<AdminSettingsAuthentication />}
                                />

                                <Route
                                    path="/admin/settings/content"
                                    element={<AdminSettingsContent />}
                                />

                                <Route
                                    path="/admin/settings/contests"
                                    element={<AdminSettingsContests />}
                                />

                                <Route
                                    path="/admin/settings/notifications"
                                    element={<AdminSettingsNotifications />}
                                />

                                <Route
                                    path="/admin/settings/security"
                                    element={<AdminSettingsSecurity />}
                                />
                            </Route>

                        </Route>

                        <Route path="/dsa" element={<DSA />} />
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>

            </div>


            {/* =================================================
                RIGHT SIDE MENU
            ================================================= */}

            {!isAdminRoute && <SideMenu
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                brightMode={brightMode}
            />}

        </div>
    );
};


const NotFound = () => (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#4AFFC4]">404 · Page not found</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#EDF2F7]">This page isn’t here</h1>
        <p className="mt-2 max-w-md text-sm text-[#7F8B9C]">The address may be incorrect, or the page may have moved.</p>
        <Link to="/" className="mt-6 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06100C]">Back to home</Link>
    </section>
);


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


    const isAdmin = user?.role === "admin";
    const menuSections = [
        {
            title: "Explore",
            links: [
                { name: "Home", path: "/" },
                { name: "Our Team", path: "/team" },
                { name: "Contests", path: "/contests" },
                { name: "Leaderboard", path: "/leaderboard" },
                { name: "CP", path: "/cp" },
                { name: "DSA", path: "/dsa" },
            ],
        },
        ...(isAuthenticated ? [{
            title: "Learning",
            links: [
                { name: "Dashboard", path: isAdmin ? "/admin/dashboard" : "/dashboard" },
                { name: "Daily Problems", path: "/problems" },
                { name: "CP Sheet", path: "/cp-sheet" },
                { name: "DSA Sheet", path: "/dsa-sheet" },
                {
                    name: "System Design",
                    path: "/system-design",
                },

            ],
        }] : []),
    ];

    // Keep the expanded navigation complete while guarding against accidental duplicate links.
    const seenPaths = new Set();
    const uniqueMenuSections = menuSections.map((section) => ({
        ...section,
        links: section.links.filter((link) => {
            if (seenPaths.has(link.path)) return false;
            seenPaths.add(link.path);
            return true;
        }),
    })).filter((section) => section.links.length > 0);


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
        self-start
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
            style={{ width: menuOpen ? "min(320px, calc(100vw - 48px))" : "0px" }}
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

                    <div className="space-y-6">
                        {uniqueMenuSections.map((section) => (
                            <section key={section.title} aria-label={section.title}>
                                <h3 className={`px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${brightMode ? "text-gray-500" : "text-[#667386]"}`}>
                                    {section.title}
                                </h3>
                                <div className="space-y-1">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={closeMenu}
                                            className={`block rounded-lg px-3 py-2.5 text-sm transition duration-200 ${brightMode
                                                ? "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
                                                : "text-[#AEB9C7] hover:bg-[#111923] hover:text-[#4AFFC4]"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
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
                        <>
                            <Link
                                to="/login"
                                onClick={closeMenu}
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

                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className={`mt-2 block w-full rounded-lg border px-4 py-3 text-left font-mono text-sm transition ${brightMode
                                    ? "border-gray-200 text-gray-700 hover:bg-gray-100"
                                    : "border-[#1C2734] text-[#AEB9C7] hover:bg-[#111923] hover:text-white"
                                    }`}
                            >
                                Create account
                            </Link>
                        </>
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
