import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({base:"/esq2ared/",plugins:[react()],define:{"import.meta.env.VITE_STATIC_PREVIEW":JSON.stringify("true")}});
