const AuthTextField = ({ label, ...inputProps }) => (
    <div>
        <label htmlFor={inputProps.id} className="mb-2 block font-mono text-[11px] text-[#AEB9C7]">
            {label}
        </label>
        <input
            {...inputProps}
            className="w-full rounded-md border border-[#1C2734] bg-[#060A10] px-4 py-3 font-mono text-sm text-[#EDF2F7] outline-none transition placeholder:text-[#3E4A5B] focus:border-[#4AFFC4]/50 focus:ring-2 focus:ring-[#4AFFC4]/5 disabled:cursor-not-allowed disabled:opacity-60"
        />
    </div>
);

export default AuthTextField;
