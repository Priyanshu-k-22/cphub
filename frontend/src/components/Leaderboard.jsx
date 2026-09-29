import React, { useEffect, useState } from "react";
import { Filter, RefreshCw, Trophy } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Container from "../ui/Container.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import { getLeaderboard } from "../api/leaderboard.api.js";

const TYPES = [
  { id: "cp-sheet", label: "CP Sheet" },
  { id: "dsa-sheet", label: "DSA Sheet" },
  { id: "daily-problem", label: "Daily Problems" },
];

const PERIODS = [
  { id: "all-time", label: "All Time" },
  { id: "year", label: "This Year" },
  { id: "month", label: "Monthly" },
];

const rankStyle = (rank) => {
  if (rank === 1) return "border-[#5A4E1E] bg-[#1D1A0E] text-[#FFD84A]";
  if (rank === 2) return "border-[#3A4250] bg-[#141A22] text-[#D4DEEA]";
  if (rank === 3) return "border-[#5A3A1E] bg-[#1D160E] text-[#E0A672]";
  return "border-transparent text-[#AEB9C7]";
};

const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedType = searchParams.get("type");
  const [type, setType] = useState(TYPES.some((item) => item.id === requestedType) ? requestedType : "cp-sheet");
  const [period, setPeriod] = useState("all-time");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getLeaderboard({ type, period, page, limit: 50 })
      .then((response) => {
        if (!active) return;
        const data = response?.data?.data || response?.data || {};
        setRows(Array.isArray(data.leaderboard) ? data.leaderboard : []);
        setPagination(data.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 });
      })
      .catch((requestError) => {
        if (!active) return;
        setRows([]);
        setPagination({ page: 1, limit: 50, total: 0, totalPages: 0 });
        setError(requestError?.response?.data?.message || "Could not load the leaderboard.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [type, period, page, refreshKey]);

  const changeType = (nextType) => {
    setType(nextType);
    setPage(1);
    setSearchParams({ type: nextType }, { replace: true });
  };

  const changePeriod = (nextPeriod) => {
    setPeriod(nextPeriod);
    setPage(1);
  };

  return (
    <section id="leaderboard" className="border-b border-[#1C2734] bg-[#080D14]">
      <Container className="py-8 lg:py-10">
        <SectionLabel index={4} total={10} title="Community Leaderboard" />

        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-[#EDF2F7] sm:text-3xl">
              <Trophy size={24} className="text-[#4AFFC4]" /> Leaderboard
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7F8B9C]">
              See how students across CpHub are progressing through the practice sheets.
            </p>
          </div>
          <button type="button" onClick={() => setRefreshKey((key) => key + 1)} disabled={loading} className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#273342] px-3.5 py-2 text-xs font-medium text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4] disabled:opacity-50 lg:self-auto">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Leaderboard category">
          {TYPES.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={type === item.id} onClick={() => changeType(item.id)} className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${type === item.id ? "border-[#4AFFC4] bg-[#0E1D18] text-[#4AFFC4]" : "border-[#273342] bg-[#0A1018] text-[#8B95A7] hover:text-[#EDF2F7]"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Filter size={14} className="mr-1 text-[#556275]" />
          {PERIODS.map((item) => (
            <button key={item.id} type="button" onClick={() => changePeriod(item.id)} aria-pressed={period === item.id} className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${period === item.id ? "border-[#4AFFC4] bg-[#0E1D18] text-[#4AFFC4]" : "border-[#2A3341] text-[#8B95A7] hover:text-[#EDF2F7]"}`}>
              {item.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-[#687587]">
            {loading ? "Loading…" : `${pagination.total.toLocaleString()} student${pagination.total === 1 ? "" : "s"}`}
          </span>
        </div>

        {error && (
          <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-300">
            <span>{error}</span>
            <button type="button" onClick={() => setRefreshKey((key) => key + 1)} className="font-medium underline underline-offset-2">Retry</button>
          </div>
        )}

        <div className="scrollbar-thin overflow-x-auto rounded-xl border border-[#1C2734]">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#1C2734] bg-[#0C1420] font-mono text-[10px] uppercase tracking-wider text-[#687587]">
                <th className="px-4 py-3.5">Rank</th>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">College / Department</th>
                <th className="px-4 py-3.5 text-right">Solved</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }, (_, index) => <tr key={index} className="border-b border-[#151E29]"><td colSpan="4" className="px-4 py-4"><div className="h-5 animate-pulse rounded bg-[#111923]" /></td></tr>)
              ) : rows.length ? rows.map((row) => (
                <tr key={row.userId} className="border-b border-[#151E29] last:border-0 transition-colors hover:bg-[#0C1420]">
                  <td className="px-4 py-3.5">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs font-semibold ${rankStyle(row.rank)}`}>{row.rank}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#273342] bg-[#111923] text-xs font-semibold text-[#4AFFC4]">
                        {row.username?.slice(0, 1)?.toUpperCase() || "?"}
                        {row.avatar && <img src={row.avatar} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(event) => event.currentTarget.remove()} />}
                      </span>
                      <span className="font-semibold text-[#EDF2F7]">{row.username || "CpHub student"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#8B95A7]">{[row.department, row.currentSemester, row.college].filter(Boolean).join(" · ") || "—"}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-semibold text-[#4AFFC4]">{row.solved}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="px-6 py-14 text-center">
                  <p className="text-sm font-medium text-[#AEB9C7]">No solves recorded for this leaderboard yet.</p>
                  <p className="mt-2 text-xs text-[#687587]">Complete problems in this category to appear here.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-[#687587]">{loading ? "" : `Page ${pagination.page} of ${Math.max(1, pagination.totalPages)}`}</p>
          <div className="flex gap-2">
            <button type="button" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-[#273342] px-3.5 py-2 text-xs text-[#AEB9C7] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            <button type="button" disabled={loading || page >= pagination.totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-[#273342] px-3.5 py-2 text-xs text-[#AEB9C7] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Leaderboard;
