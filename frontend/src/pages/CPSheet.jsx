import React, { useEffect, useState } from "react";

import CPSheetHeader from "../components/cp/sheet/CPSheetHeader";
import RatingTabs from "../components/cp/sheet/RatingTabs";
import SheetProgress from "../components/cp/sheet/SheetProgress";
import ProblemList from "../components/cp/sheet/ProblemList.jsx";
import SheetLeaderboard from "../components/leaderboard/SheetLeaderboard.jsx";

import {
    getCPSheet
} from "../api/cpSheet.api.js";


const RATINGS = [
    800,
    900,
    1000,
    1100,
    1200,
];


const CPSheet = () => {

    const [selectedRating, setSelectedRating] =
        useState(800);

    const [problems, setProblems] =
        useState([]);

    const [progress, setProgress] =
        useState({
            total: 0,
            solved: 0,
        });

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [leaderboardRefreshKey, setLeaderboardRefreshKey] =
        useState(0);


    const fetchSheet = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getCPSheet(selectedRating);

            const data =
                response?.data?.data || response?.data;


            setProblems(
                data?.problems || []
            );

            setProgress(
                data?.progress || {
                    total: 0,
                    solved: 0,
                }
            );

        } catch (err) {

            console.error(
                "Failed to fetch CP Sheet:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load CP Sheet."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchSheet();

    }, [selectedRating]);


    const handleRatingChange = (rating) => {

        if (rating === selectedRating)
            return;

        setSelectedRating(rating);
    };


    const handleProgressUpdate = ({ solvedDelta = 0 } = {}) => {
        setProgress((current) => ({
            ...current,
            solved: Math.min(
                current.total,
                Math.max(0, current.solved + solvedDelta)
            ),
        }));
        setLeaderboardRefreshKey((current) => current + 1);
    };


    return (

        <main
            className="
                min-h-screen
                bg-[#060A10]
                px-4
                py-8
                text-white
                md:px-8
                lg:px-12
            "
        >

            <div
                className="
                    mx-auto
                    max-w-7xl
                "
            >

                {/* HEADER */}

                <CPSheetHeader />


                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="min-w-0">
                        {/* RATING TABS */}
                        <RatingTabs
                            ratings={RATINGS}
                            selectedRating={selectedRating}
                            onRatingChange={handleRatingChange}
                        />

                        {/* PROGRESS */}
                        <SheetProgress
                            solved={progress.solved}
                            total={progress.total}
                        />

                        {/* ERROR */}
                        {error && (
                            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* PROBLEMS */}
                        <ProblemList
                            problems={problems}
                            loading={loading}
                            onProgressUpdate={handleProgressUpdate}
                        />
                    </div>

                    <SheetLeaderboard refreshSignal={leaderboardRefreshKey} />
                </div>

            </div>

        </main>

    );
};


export default CPSheet;
