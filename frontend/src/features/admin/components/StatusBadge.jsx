import React from "react";


const StatusBadge = ({
    status
}) => {

    const styles = {

        active: `
            bg-[var(--theme-accent)]/10
            text-[var(--theme-accent)]
        `,

        inactive: `
            bg-[#556275]/10
            text-[var(--theme-text-muted)]
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
            bg-[var(--theme-accent)]/10
            text-[var(--theme-accent)]
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