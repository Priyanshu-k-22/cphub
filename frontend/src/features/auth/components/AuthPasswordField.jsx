import { Eye, EyeOff } from "lucide-react";

const AuthPasswordField = ({ label = "password", visible, onToggle, ...inputProps }) => (
    <div>
        <label htmlFor={inputProps.id} className="mb-2 block font-mono text-[11px] text-[#AEB9C7]">
            {label}
        </label>
        <div className="relative">
            <input
                {...inputProps}
                type={visible ? "text" : "password"}
                className="w-full rounded-md border border-[#1C2734] bg-[#060A10] px-4 py-3 pr-12 font-mono text-sm text-[#EDF2F7] outline-none transition placeholder:text-[#3E4A5B] focus:border-[#4AFFC4]/50 focus:ring-2 focus:ring-[#4AFFC4]/5 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
                type="button"
                onClick={onToggle}
                disabled={inputProps.disabled}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#556275] transition hover:text-[#4AFFC4] disabled:opacity-50"
            >
                {visible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
        </div>
    </div>
);

export default AuthPasswordField;
