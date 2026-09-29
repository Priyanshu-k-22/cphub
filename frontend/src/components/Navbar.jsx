import React from "react";

import {
    Link,
    NavLink
} from "react-router-dom";
import { Moon, Sun } from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";


const Navbar = ({
    menuOpen,
    setMenuOpen,
    brightMode,
    onToggleTheme,
}) => {

    const {
        isAuthenticated,
        loading,
        user
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | LOGGED OUT NAVIGATION
    |--------------------------------------------------------------------------
    */

    const loggedOutLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "CP",
            path: "/cp",
        },
        {
            name: "DSA",
            path: "/dsa",
        },
        {
            name: "About",
            path: "/about",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | LOGGED IN NAVIGATION
    |--------------------------------------------------------------------------
    */

    const loggedInLinks = [
        {
            name: "Dashboard",
            path: user?.role === "admin" ? "/admin/dashboard" : "/dashboard",
        },
        {
            name: "Problems",
            path: "/problems",
        },
        {
            name: "Contest",
            path: "/contests",
        },
        {
            name: "CP",
            path: "/cp",
        },
        {
            name: "CP Sheet",
            path: "/cp-sheet",
        },
        {
            name: "DSA Sheet",
            path: "/dsa-sheet",
        },
        {
            name: "DSA",
            path: "/dsa",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | SELECT NAVIGATION
    |--------------------------------------------------------------------------
    */

    const primaryLinks = isAuthenticated
        ? loggedInLinks
        : loggedOutLinks;


    /*
    |--------------------------------------------------------------------------
    | NAV LINK STYLE
    |--------------------------------------------------------------------------
    */

    const navLinkClass = ({ isActive }) => `
        relative
        px-2
        py-1
        font-mono
        text-sm
        transition-colors
        duration-200

        ${
            isActive
                ? "text-[#4AFFC4]"
                : brightMode
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-[#AEB9C7] hover:text-white"
        }
    `;


    /*
    |--------------------------------------------------------------------------
    | COMPONENT
    |--------------------------------------------------------------------------
    */

    return (

        <header
            className={`
                sticky
                top-0
                z-50
                border-b
                transition-colors
                duration-300

                ${
                    brightMode
                        ? "border-gray-200 bg-white"
                        : "border-[#1C2734] bg-[#060A10]"
                }
            `}
        >

            <div
                className="
                    flex
                    h-16
                    items-center
                "
            >

                {/* =========================================================
                    LOGO
                ========================================================= */}

                <Link
                    to="/"
                    className={`
                        ml-5
                        shrink-0
                        font-display
                        text-xl
                        font-bold
                        tracking-tight
                        md:ml-7

                        ${
                            brightMode
                                ? "text-gray-900"
                                : "text-white"
                        }
                    `}
                >

                    Cp

                    <span className="text-[#4AFFC4]">
                        Hub
                    </span>

                </Link>


                {/* =========================================================
                    PRIMARY NAVIGATION
                ========================================================= */}

                <nav
                    className={`
                        ml-8
                        hidden
                        items-center
                        gap-5
                        ${menuOpen ? "" : "md:flex"}
                    `}
                >

                    {primaryLinks.map((link) => (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === "/dsa"}
                            className={navLinkClass}
                        >
                            {link.name}
                        </NavLink>

                    ))}

                </nav>


                {/* =========================================================
                    RIGHT SIDE
                ========================================================= */}

                <div
                    className="
                        ml-auto
                        flex
                        items-center
                    "
                >

                    {/* =====================================================
                        LOGIN BUTTON
                    ===================================================== */}

                    {!loading && !isAuthenticated && (

                        <Link
                            to="/login"
                            className={`
                                mr-3
                                rounded-lg
                                border
                                border-[#4AFFC4]
                                bg-[#4AFFC4]
                                px-4
                                py-2
                                font-mono
                                text-sm
                                font-semibold
                                text-[#060A10]
                                transition-all
                                duration-200

                                ${
                                    brightMode
                                        ? "hover:bg-transparent hover:text-[#4AFFC4]"
                                        : "hover:bg-transparent hover:text-[#4AFFC4]"
                                }
                            `}
                        >
                            Login
                        </Link>

                    )}

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label={brightMode ? "Switch to dark mode" : "Switch to light mode"}
                        aria-pressed={brightMode}
                        title={brightMode ? "Switch to dark mode" : "Switch to light mode"}
                        className={`mr-2 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${brightMode
                            ? "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                            : "border-[#1C2734] bg-[#0A1018] text-[#4AFFC4] hover:border-[#4AFFC4]/50"
                            }`}
                    >
                        {brightMode ? <Moon size={17} /> : <Sun size={18} />}
                    </button>


                    {/* =====================================================
                        MENU BUTTON
                    ===================================================== */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={
                            menuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation-drawer"
                        className={`
                            mr-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition-all
                            duration-200
                            md:mr-6

                            ${
                                brightMode
                                    ? `
                                        border-gray-300
                                        text-gray-600
                                        hover:border-[#4AFFC4]/60
                                        hover:text-[#4AFFC4]
                                    `
                                    : `
                                        border-[#1C2734]
                                        text-[#AEB9C7]
                                        hover:border-[#4AFFC4]/40
                                        hover:text-[#4AFFC4]
                                    `
                            }
                        `}
                    >

                        {menuOpen ? (

                            <span
                                className="
                                    text-2xl
                                    leading-none
                                "
                            >
                                ×
                            </span>

                        ) : (

                            <span
                                className="
                                    text-lg
                                    leading-none
                                "
                            >
                                ☰
                            </span>

                        )}

                    </button>

                </div>

            </div>

        </header>

    );
};


export default Navbar;
