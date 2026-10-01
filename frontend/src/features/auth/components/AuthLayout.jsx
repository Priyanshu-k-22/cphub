import React from "react";


const AuthLayout = ({ children }) => {

    return (
        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-[#060A10]
            text-[#EDF2F7]
        ">

            {/* =========================================================
                BACKGROUND GRID
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.16]
                    [background-image:linear-gradient(rgba(28,39,52,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(28,39,52,0.5)_1px,transparent_1px)]
                    [background-size:42px_42px]
                "
            />


            {/* =========================================================
                CENTER GLOW
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[600px]
                    w-[600px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#4AFFC4]/[0.035]
                    blur-[140px]
                "
            />


            {/* =========================================================
                TOP LEFT BRAND
            ========================================================= */}

            <div className="
                absolute
                left-6
                top-6
                z-20
                flex
                items-center
                gap-2
            ">

                <div className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[#4AFFC4]/30
                    bg-[#4AFFC4]/5
                    font-mono
                    text-xs
                    font-bold
                    text-[#4AFFC4]
                ">
                    &gt;_
                </div>


                <div>

                    <p className="
                        font-mono
                        text-sm
                        font-bold
                        text-[#EDF2F7]
                    ">
                        CpHub
                    </p>

                    <p className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-widest
                        text-[#556275]
                    ">
                        competitive programming
                    </p>

                </div>

            </div>


            {/* =========================================================
                TOP RIGHT TERMINAL
            ========================================================= */}

            <div className="
                absolute
                right-6
                top-6
                hidden
                font-mono
                text-[9px]
                leading-5
                text-[#556275]
                opacity-60
                lg:block
            ">

                <div>
                    cphub@contestant:~$ auth
                </div>

                <div>
                    status:
                    <span className="text-[#4AFFC4]">
                        {" "}online
                    </span>
                </div>

            </div>


            {/* =========================================================
                BACKGROUND CODE
            ========================================================= */}

            <div className="
                pointer-events-none
                absolute
                inset-0
                hidden
                overflow-hidden
                lg:block
            ">

                <pre className="
                    absolute
                    left-[5%]
                    top-[20%]
                    font-mono
                    text-[10px]
                    leading-5
                    text-[#556275]
                    opacity-30
                ">
{`#include <cphub.h>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> problems;

sort(
    problems.begin(),
    problems.end()
);`}
                </pre>


                <pre className="
                    absolute
                    right-[6%]
                    top-[24%]
                    font-mono
                    text-[10px]
                    leading-5
                    text-[#556275]
                    opacity-30
                ">
{`Contest contest;

contest.start();

while (!solved) {
    practice();
    try_again();
}

submit();`}
                </pre>


                <pre className="
                    absolute
                    bottom-[18%]
                    left-[8%]
                    font-mono
                    text-[10px]
                    leading-5
                    text-[#556275]
                    opacity-30
                ">
{`for (auto problem : contest) {
    solve(problem);
    submit(problem);
}

// consistency
// beats
// motivation`}
                </pre>


                <pre className="
                    absolute
                    bottom-[18%]
                    right-[8%]
                    font-mono
                    text-[10px]
                    leading-5
                    text-[#556275]
                    opacity-30
                ">
{`if (accepted) {
    improve();
    repeat();
}

rating++;
skills++;`}
                </pre>

            </div>


            {/* =========================================================
                CONTENT
            ========================================================= */}

            <main className="
                relative
                z-10
                flex
                min-h-screen
                items-center
                justify-center
                px-4
                py-24
            ">

                {children}

            </main>


            {/* =========================================================
                FOOTER
            ========================================================= */}

            <div className="
                absolute
                bottom-5
                left-0
                right-0
                z-20
                text-center
            ">

                <p className="
                    font-mono
                    text-[9px]
                    text-[#3E4A5B]
                ">
                    solve · learn · compete · improve
                </p>

            </div>

        </div>
    );
};


export default AuthLayout;