import React, { useCallback, useEffect, useState } from "react";
import { Check, RefreshCw, Save } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import { getAdminSettings, updateAdminSettings } from "../../../api/adminSettings.api";

const AdminSettings = () => {
    const [registrationsEnabled, setRegistrationsEnabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAdminSettings();
            setRegistrationsEnabled(response?.data?.registrationsEnabled ?? true);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load platform settings.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => { load(); }, [load]);

    const save = async () => {
        setSaving(true);
        setError("");
        setNotice("");
        try {
            const response = await updateAdminSettings({ registrationsEnabled });
            setRegistrationsEnabled(response?.data?.registrationsEnabled ?? registrationsEnabled);
            setNotice("Registration setting saved.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save platform settings.");
        } finally {
            setSaving(false);
        }
    };

    return <AdminLayout>
        <div className="max-w-3xl px-4 py-5 sm:px-5 lg:px-7">
            <AdminPageHeader title="Settings" description="Platform controls are saved and enforced by the server." action={load} actionLabel="Reload" />
            {error && <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
            {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"><Check size={15} />{notice}</div>}
            <section className="rounded-xl border border-[#1C2734] bg-[#080D14] p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div><h2 className="font-semibold text-[#DCE4ED]">Student registrations</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#7F8B9C]">When disabled, new accounts are blocked on both the registration page and the API.</p></div>
                    <button type="button" role="switch" aria-checked={registrationsEnabled} disabled={loading || saving} onClick={() => setRegistrationsEnabled((current) => !current)} className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${registrationsEnabled ? "bg-[#4AFFC4]" : "bg-[#26313E]"}`} aria-label="Allow new student registrations"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${registrationsEnabled ? "left-6" : "left-1"}`} /></button>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#1C2734] pt-4"><span className={`text-xs font-medium ${registrationsEnabled ? "text-[#4AFFC4]" : "text-[#F5C542]"}`}>{loading ? "Loading…" : registrationsEnabled ? "Registrations open" : "Registrations closed"}</span><button type="button" disabled={loading || saving} onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D] disabled:opacity-50">{saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}{saving ? "Saving…" : "Save setting"}</button></div>
            </section>
        </div>
    </AdminLayout>;
};

export default AdminSettings;
