// resources/js/Pages/Dashboard.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-colors duration-500">
            <Head title="Dashboard Analytics" />

            {/* Framer Motion Wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl w-full glass rounded-3xl p-10 text-center"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-block bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold tracking-wider mb-6"
                >
                    BI SYSTEM ACTIVE
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-tight">
                    Data Analytics{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Platform
                    </span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Sistem pemrosesan ETL dan visualisasi data yang
                    terintegrasi. Siap untuk melakukan kalkulasi statistik
                    agregat dari *raw dataset* Anda.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {/* Dummy Metrics untuk visualisasi awal */}
                    {[
                        { label: "Total Datasets", value: "12" },
                        { label: "Rows Processed", value: "45,231" },
                        { label: "Avg. Processing Time", value: "1.2s" },
                    ].map((metric, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/40 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
                        >
                            <div className="text-3xl font-bold text-gray-800 dark:text-white">
                                {metric.value}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
