import React from "react";

const FloatingTerminal = ({
    command,
    output,
    className = "",
    delay = 0,
}) => {
    return (
        <div
            className={`
                pointer-events-none
                absolute
                hidden
                rounded-md
                border
                border-[#1C2734]
                bg-[#080E16]/60
                px-3
                py-2
                font-mono
                text-[9px]
                leading-5
                text-[#556275]
                backdrop-blur-sm
                lg:block
                ${className}
            `}
            style={{
                animation: `terminalFloat 9s ease-in-out ${delay}s infinite alternate`,
            }}
        >
            <div>
                <span className="text-[#4AFFC4]">&gt;</span>{" "}
                {command}
            </div>

            <div>
                <span className="text-[#4AFFC4]">✓</span>{" "}
                {output}
            </div>
        </div>
    );
};

export default FloatingTerminal;