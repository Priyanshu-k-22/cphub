import React from "react";
import {
    Prism as SyntaxHighlighter
} from "react-syntax-highlighter";

import {
    vscDarkPlus
} from "react-syntax-highlighter/dist/esm/styles/prism";


const CodeBlock = ({
    code,
    language = "cpp"
}) => {

    if (!code) {
        return null;
    }


    const normalizedCode = code
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t");


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                normalizedCode
            );
        } catch (error) {
            console.error(
                "Failed to copy code:",
                error
            );
        }
    };


    return (
        <div className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#1E1E1E]">

            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-[#303030] bg-[#181818] px-4 py-2.5">

                <div className="flex items-center gap-3">

                    {/* Window dots */}
                    <div className="flex items-center gap-1.5">

                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />

                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />

                        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />

                    </div>


                    <span className="font-mono text-xs text-[#AEB9C7]">
                        solution.{getFileExtension(language)}
                    </span>

                </div>


                <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-md px-3 py-1.5 font-mono text-xs text-[#AEB9C7] transition hover:bg-[#2A2A2A] hover:text-white"
                >
                    copy
                </button>

            </div>


            {/* Code */}
            <div className="overflow-x-auto">

                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers
                    wrapLongLines={false}
                    customStyle={{
                        margin: 0,
                        padding: "20px 0",
                        background: "#1E1E1E",
                        fontSize: "14px",
                        lineHeight: "1.7",
                        minWidth: "max-content"
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily:
                                '"JetBrains Mono", "Fira Code", Consolas, monospace'
                        }
                    }}
                    lineNumberStyle={{
                        minWidth: "3.5em",
                        paddingRight: "1.5em",
                        textAlign: "right",
                        color: "#5A5A5A",
                        userSelect: "none"
                    }}
                >
                    {normalizedCode}
                </SyntaxHighlighter>

            </div>

        </div>
    );
};


const getFileExtension = (language) => {

    const extensions = {
        cpp: "cpp",
        c: "c",
        javascript: "js",
        js: "js",
        python: "py",
        java: "java",
        typescript: "ts",
        ts: "ts"
    };

    return extensions[language] || "txt";
};


export default CodeBlock;