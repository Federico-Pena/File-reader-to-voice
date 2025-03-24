import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";
import { FileReaderProvider } from "./context/FileReaderContext";
import { LocalDataContextProvider } from "./context/LocalDataContext";
import { VoiceProvider } from "./context/VoiceContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalDataContextProvider>
      <FileReaderProvider>
        <VoiceProvider>
          <App />
        </VoiceProvider>
      </FileReaderProvider>
    </LocalDataContextProvider>
  </StrictMode>
);
