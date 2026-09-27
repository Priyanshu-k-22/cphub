import React from "react";


const StatusBadge = ({
    status
}) => {

    const styles = {

        active: `
            bg-[#4AFFC4]/10
            text-[#4AFFC4]
        `,

        inactive: `
            bg-[#556275]/10
            text-[#687587]
        `,

        pending: `
            bg-yellow-400/10
            text-yellow-400
        `,

        error: `
            bg-red-400/10
            text-red-400
        `,

        solved: `
            bg-[#4AFFC4]/10
            text-[#4AFFC4]
        `
    };


    return (

        <span
            className={`
                inline-flex
                rounded-full
                px-2
                py-1
                font-mono
                text-[8px]
                uppercase
                ${styles[status] || styles.inactive}
            `}
        >
            {status}
        </span>

    );
};


export default StatusBadge;