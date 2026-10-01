import React from "react";
import { RefreshCw } from "lucide-react";


const DashboardHeader = ({ generatedAt, loading, onRefresh }) => {

    return (

        <div
            className="
                mb-5
                flex
                items-end
                justify-between
            "
        >

            <div>

                <p
                    className="
                        mb-1
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-[#4AFFC4]
                    "
                >
                    Admin Panel
                </p>


                <h1
                    className="
                        text-xl
                        font-semibold
                        tracking-tight
                        text-[#E8EEF5]
                    "
                >
                    Dashboard
                </h1>


                <p
                    className="
                        mt-1
                        text-[11px]
                        text-[#687587]
                    "
                >
                    Manage and monitor your CpHub platform.
                </p>

            </div>


            <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="font-mono text-[9px] text-[#394656]">ADMIN / OVERVIEW</p>
                    <p className="mt-1 font-mono text-[8px] text-[#556275]">
                        {generatedAt ? `Updated ${new Date(generatedAt).toLocaleTimeString()}` : "Waiting for data"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#1C2734] px-3 py-2 font-mono text-[9px] text-[#AEB9C7] transition hover:border-[#4AFFC4]/30 hover:text-[#4AFFC4] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

        </div>
    );
};


export default DashboardHeader;
