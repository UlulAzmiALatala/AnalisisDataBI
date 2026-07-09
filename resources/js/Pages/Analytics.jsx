// resources/js/Pages/Analytics.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Analytics({ dataset, columns, previewData }) {
    // Mengambil 20 data pertama untuk divisualisasikan di Chart agar tidak terlalu padat
    const chartData = previewData.slice(0, 20);

    // Menentukan secara dinamis kolom mana yang jadi sumbu X dan Y
    const xAxisKey = columns.length > 0 ? columns[0] : "";
    const yAxisKey = columns.length > 1 ? columns[1] : xAxisKey;

    // Konfigurasi animasi Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 p-6 md:p-10 text-gray-800 dark:text-gray-100">
            <Head title={`Analytics - ${dataset.name}`} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-8"
            >
                {/* Header Section */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-between items-end border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                    <div>
                        <Link
                            href="/"
                            className="text-sm text-blue-500 hover:text-blue-600 mb-2 inline-block font-semibold tracking-wide"
                        >
                            &larr; Kembali ke Home
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {dataset.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Analisis data real-time berbasis struktur JSONB.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Baris Diproses
                        </div>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {dataset.total_rows.toLocaleString()}
                        </div>
                    </div>
                </motion.div>

                {/* Chart Section (Glassmorphism) */}
                <motion.div
                    variants={itemVariants}
                    className="glass rounded-3xl p-6 shadow-sm"
                >
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded-full block"></span>
                        Distribusi Data ({yAxisKey} vs {xAxisKey})
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey={xAxisKey}
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "rgba(17, 24, 39, 0.8)",
                                        borderColor: "#374151",
                                        borderRadius: "12px",
                                        color: "#fff",
                                    }}
                                    itemStyle={{ color: "#60A5FA" }}
                                />
                                <Bar
                                    dataKey={yAxisKey}
                                    fill="#3B82F6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Data Table Section */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h3 className="text-lg font-bold">
                            Data Preview (Top 100)
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    {columns.map((col, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {previewData.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        {columns.map((col, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                            >
                                                {row[col]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
