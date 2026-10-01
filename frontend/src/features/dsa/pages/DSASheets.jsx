import React, { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, RefreshCw } from "lucide-react";
import Footer from "../../../shared/components/layout/Footer.jsx";
import { getDSASheets } from "../api/dsaSheet.api.js";

const DSASheets = () => {
    const [sheets, setSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSheets = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getDSASheets();
            setSheets(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load DSA sheets.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadSheets(); }, []);

    return (
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">
            <main className="mx-auto max-w-5xl px-5 py-20">
                <section className="max-w-3xl">
                    <p className="font-mono text-sm text-[#4AFFC4]">cp/dsa/resources/sheets</p>
                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">DSA Sheets</h1>
                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">Curated DSA sheets to help you practice problems systematically and strengthen your problem-solving skills.</p>
                </section>

                {loading ? <div className="mt-14 rounded-2xl border border-[#1C2734] bg-[#0A1018] p-10 text-center text-[#AEB9C7]">Loading DSA sheets…</div>
                    : error ? <div role="alert" className="mt-14 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300"><p>{error}</p><button type="button" onClick={loadSheets} className="mt-3 inline-flex items-center gap-2 underline"><RefreshCw size={14} />Try again</button></div>
                        : sheets.length ? <section className="mt-14 grid gap-6 md:grid-cols-2">
                            {sheets.map((sheet) => <article key={sheet._id} className="group flex flex-col rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40">
                                <div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5"><BookOpen size={22} className="text-[#4AFFC4]" /></div><span className="rounded-full border border-[#1C2734] px-3 py-1 font-mono text-xs text-[#778396]">{sheet.source}</span></div>
                                <h2 className="mt-7 text-2xl font-semibold group-hover:text-[#4AFFC4]">{sheet.title}</h2>
                                <p className="mt-3 flex-1 text-sm leading-6 text-[#778396]">{sheet.description}</p>
                                <a href={sheet.url} target="_blank" rel="noopener noreferrer" className="mt-7 flex items-center justify-between rounded-lg border border-[#1C2734] bg-[#060A10] px-4 py-3 font-mono text-sm text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]"><span>Open Sheet</span><ArrowUpRight size={17} /></a>
                            </article>)}
                        </section> : <div className="mt-14 rounded-2xl border border-dashed border-[#1C2734] bg-[#0A1018] p-10 text-center"><BookOpen className="mx-auto text-[#4AFFC4]" /><p className="mt-3 font-medium">No DSA sheets have been published yet.</p><p className="mt-1 text-sm text-[#778396]">Check back later for curated resources.</p></div>}

                <section className="mt-10 rounded-xl border border-[#1C2734] bg-[#0A1018] p-5"><p className="text-sm leading-6 text-[#778396]">These resources are hosted externally. Selecting <span className="mx-1 text-[#AEB9C7]">Open Sheet</span> opens the selected resource in a new tab.</p></section>
            </main>
            <Footer />
        </div>
    );
};

export default DSASheets;
