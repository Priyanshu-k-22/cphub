import React from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";


const AdminLayout = ({ children }) => {

    return (
        <div
            className="
                admin-ui
                min-h-screen
                bg-[#060A0F]
                text-white
            "
        >

            <div className="flex min-h-screen">

                <AdminSidebar />

                <div
                    className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                    "
                >

                    <AdminTopbar />

                    <main
                        className="
                            min-w-0
                            flex-1
                            overflow-x-hidden
                        "
                    >
                        {children}
                    </main>

                </div>

            </div>

        </div>
    );
};


export default AdminLayout;
