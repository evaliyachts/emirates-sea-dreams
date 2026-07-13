import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { shouldHydrateRoot } from "@/app/hydration";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("Missing #root application element");

const app = <App forceNotFound={root.dataset.staticStatus === "404"} />;

if (shouldHydrateRoot(root)) hydrateRoot(root, app);
else createRoot(root).render(app);
