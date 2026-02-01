import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";

import "./index.css";
import DoctorContextProvider from "./src/context/DoctorContextProvider";
import './src/styles/global.css'; 
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";


import { LoaderProvider } from "./src/context/LoaderContext";

// 🔹 Get root container
const container = document.getElementById("root");

// 🔹 Normal SPA render ONLY (NO hydration)
if (container) {
  createRoot(container).render(
    <DoctorContextProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </DoctorContextProvider>
  );
}
