const ProfileStat = ({ icon: Icon, label, value, sublabel }) => (
    <div className="min-w-0 px-4 py-4 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-medium text-[var(--theme-text-muted)]"><Icon size={14} className="text-[var(--theme-accent)]" />{label}</p>
        <p className="mt-2 truncate text-xl font-semibold tracking-tight text-[var(--theme-text)]">{value}</p>
        {sublabel && <p className="mt-1 truncate text-xs text-[var(--theme-text-muted)]">{sublabel}</p>}
    </div>
);

export default ProfileStat;
