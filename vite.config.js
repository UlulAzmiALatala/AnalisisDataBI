import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.jsx", // Entry point Frontend (React/Inertia)
                "resources/js/admin.js", // Entry point Admin (Alpine/Blade)
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
