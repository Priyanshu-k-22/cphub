import React, {
    useState
} from "react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const AdminSettings = () => {

    const [maintenance, setMaintenance] =
        useState(false);

    const [registrations, setRegistrations] =
        useState(true);


    return (

        <AdminLayout>

            <div className="max-w-3xl px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="Settings"
                    description="Manage platform-level settings."
                />


                <div className="space-y-3">


                    {/* MAINTENANCE */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-[#1C2734]
                            bg-[#080D14]
                            px-4
                            py-4
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[11px]
                                    text-[#DCE4ED]
                                "
                            >
                                Maintenance Mode
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-[9px]
                                    text-[#556275]
                                "
                            >
                                Temporarily disable student access.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setMaintenance(
                                    !maintenance
                                )
                            }
                            className={`
                                relative
                                h-5
                                w-9
                                rounded-full
                                transition
                                ${
                                    maintenance
                                        ? "bg-[#4AFFC4]"
                                        : "bg-[#26313E]"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-white
                                    transition
                                    ${
                                        maintenance
                                            ? "left-5"
                                            : "left-1"
                                    }
                                `}
                            />

                        </button>

                    </div>


                    {/* REGISTRATION */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-[#1C2734]
                            bg-[#080D14]
                            px-4
                            py-4
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[11px]
                                    text-[#DCE4ED]
                                "
                            >
                                Allow Registrations
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-[9px]
                                    text-[#556275]
                                "
                            >
                                Allow new students to register.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setRegistrations(
                                    !registrations
                                )
                            }
                            className={`
                                relative
                                h-5
                                w-9
                                rounded-full
                                transition
                                ${
                                    registrations
                                        ? "bg-[#4AFFC4]"
                                        : "bg-[#26313E]"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-white
                                    transition
                                    ${
                                        registrations
                                            ? "left-5"
                                            : "left-1"
                                    }
                                `}
                            />

                        </button>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );
};


export default AdminSettings;