import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardHeader = ({ user }) => {
    const [avatarFailed, setAvatarFailed] = useState(false);
    const today = new Date();
    const username = user?.username || "there";
    const avatar = user?.profile?.avatar;

    useEffect(() => setAvatarFailed(false), [avatar]);

    const date = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">

            <div>

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#556275]">
                    dashboard
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                    Welcome back, {username} 👋
                </h1>

                {(user?.profile?.department || user?.profile?.currentSemester || user?.profile?.college) && (
                    <p className="mt-1 text-sm text-[#AEB9C7]">
                        {[user?.profile?.department, user?.profile?.currentSemester && `Semester ${user.profile.currentSemester}`, user?.profile?.college].filter(Boolean).join(" · ")}
                    </p>
                )}

                {/* Daily Motivation */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[#4AFFC4]">›</span>

                    <p className="text-xs italic text-[#4AFFC4]">
                        "Consistency beats intensity when intensity doesn't last."
                    </p>
                </div>

            </div>

            <div className="flex shrink-0 items-center gap-3">
                <p className="font-mono text-xs text-[#556275]">{date}</p>
                <Link to="/profile" aria-label="Open your profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#1C2734] bg-[#111923] font-semibold text-[#4AFFC4] transition hover:border-[#4AFFC4]">
                    {avatar && !avatarFailed
                        ? <img src={avatar} alt={`${username} profile`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
                        : username.slice(0, 1).toUpperCase()}
                </Link>
            </div>

        </div>
    );
};

export default DashboardHeader;
