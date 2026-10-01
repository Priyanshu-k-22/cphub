import React from "react";

const FloatingCode = ({
    code,
    className = "",
    delay = 0,
    duration = 20,
    opacity = 0.3,
    rotate = 0,
}) => {
    return (
        <div
            className={`
                absolute
                ${className}
                pointer-events-none
            `}
            style={{
                opacity,
                "--rotate": `${rotate}deg`,
                animation: `floatCode ${duration}s ease-in-out ${delay}s infinite alternate`,
            }}
        >
            <pre
                className="
                    whitespace-pre
                    select-none
                    font-mono
                    text-[11px]
                    leading-6
                    text-[#7F8B9C]
                "
            >
                {code}
            </pre>
        </div>
    );
};

export default FloatingCode;