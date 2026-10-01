import React, { useMemo } from "react";

import FloatingCode from "./FloatingCode.jsx";
import FloatingTerminal from "./FloatingTerminal.jsx";
import { BACKGROUND_DATA } from "./backgroundData.js";

const CODE_POSITIONS = [
    {
        className: "left-[3%] top-[13%]",
        delay: 0,
        duration: 22,
        rotate: -1,
        opacity: 0.30,
    },
    {
        className: "right-[4%] top-[17%]",
        delay: 2,
        duration: 26,
        rotate: 1,
        opacity: 0.27,
    },
    {
        className: "left-[5%] bottom-[18%]",
        delay: 1,
        duration: 24,
        rotate: 1,
        opacity: 0.25,
    },
    {
        className: "right-[5%] bottom-[16%]",
        delay: 4,
        duration: 20,
        rotate: -1,
        opacity: 0.30,
    },
    {
        className: "left-[27%] top-[7%]",
        delay: 3,
        duration: 28,
        rotate: 0,
        opacity: 0.20,
    },
    {
        className: "right-[27%] bottom-[7%]",
        delay: 5,
        duration: 23,
        rotate: 1,
        opacity: 0.22,
    },
];

const FRAGMENT_POSITIONS = [
    "left-[14%] top-[36%]",
    "right-[14%] top-[40%]",
    "left-[17%] bottom-[35%]",
    "right-[18%] bottom-[33%]",
    "left-[38%] top-[14%]",
    "right-[37%] bottom-[13%]",
    "left-[8%] top-[55%]",
    "right-[8%] top-[57%]",
];

const CodeBackground = ({ variant = "default" }) => {
    const data =
        BACKGROUND_DATA[variant] ||
        BACKGROUND_DATA.default;

    const fragments = useMemo(() => {
        return data.fragments.map((text, index) => ({
            text,
            position:
                FRAGMENT_POSITIONS[
                    index % FRAGMENT_POSITIONS.length
                ],
            delay: index * 0.8,
            duration: 7 + (index % 4),
            rotate:
                index % 3 === 0
                    ? -2
                    : index % 3 === 1
                    ? 1
                    : 0,
        }));
    }, [data]);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

            {/* =====================================================
                BASE GRID
            ===================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.16]
                    [background-image:linear-gradient(rgba(28,39,52,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(28,39,52,0.5)_1px,transparent_1px)]
                    [background-size:42px_42px]
                "
            />

            {/* =====================================================
                CENTER GLOW
            ===================================================== */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[650px]
                    w-[650px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#4AFFC4]/[0.025]
                    blur-[150px]
                "
            />

            {/* =====================================================
                FLOATING CODE
            ===================================================== */}

            <div className="absolute inset-0 hidden md:block">

                {data.code.map((code, index) => {
                    const position =
                        CODE_POSITIONS[index];

                    return (
                        <FloatingCode
                            key={index}
                            code={code}
                            className={position.className}
                            delay={position.delay}
                            duration={position.duration}
                            opacity={position.opacity}
                            rotate={position.rotate}
                        />
                    );
                })}

            </div>

            {/* =====================================================
                SMALL FLOATING FRAGMENTS
            ===================================================== */}

            <div className="absolute inset-0">

                {fragments.map((item, index) => (
                    <div
                        key={index}
                        className={`
                            absolute
                            ${item.position}
                            whitespace-nowrap
                            font-mono
                            text-[9px]
                            text-[#556275]
                        `}
                        style={{
                            opacity:
                                index % 3 === 0
                                    ? 0.25
                                    : 0.18,
                            transform: `rotate(${item.rotate}deg)`,
                            animation: `fragmentFloat ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
                        }}
                    >
                        {item.text}
                    </div>
                ))}

            </div>

            {/* =====================================================
                TERMINAL
            ===================================================== */}

            {data.terminals.map((terminal, index) => (
                <FloatingTerminal
                    key={index}
                    command={terminal.command}
                    output={terminal.output}
                    className={
                        index === 0
                            ? "left-[8%] bottom-[8%]"
                            : "right-[8%] top-[30%]"
                    }
                    delay={index * 2}
                />
            ))}

            {/* =====================================================
                DECORATIVE SCAN LINE
            ===================================================== */}

            <div
                className="
                    absolute
                    left-0
                    right-0
                    top-1/2
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#4AFFC4]/[0.025]
                    to-transparent
                "
            />

        </div>
    );
};

export default CodeBackground;