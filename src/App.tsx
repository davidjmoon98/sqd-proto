import { useState } from "react";
import SpacesPeople from "./SpacesPeople";
import MatrixView from "./MatrixView";
import LinkGenerator from "./LinkGenerator";
import LinkGenerator2 from "./LinkGenerator2";
import LinkGenerator3 from "./LinkGenerator3";
import DiagramsPage from "./DiagramsPage";
import BeachWavesPage from "./BeachWavesPage";
import { Agentation } from "agentation";

type Page = "matrix1" | "matrix2" | "linkgen1" | "linkgen2" | "linkgen3" | "diagrams" | "beachwaves";

function App() {
  const [selected, setSelected] = useState<Page>("matrix1");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [crosshair, setCrosshair] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-52" : "w-14"} bg-gray-50 border-r border-gray-200 flex-shrink-0 flex flex-col overflow-hidden transition-[width] duration-200`}>
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-500 mx-3 mt-3 self-start"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" />
          </svg>
        </button>

        <nav className="space-y-1 px-2 mt-4">
          <button
            onClick={() => setSelected("matrix1")}
            className={`w-full h-8 flex items-center whitespace-nowrap rounded text-xs transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "matrix1"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Matrix 1" : "M1"}
          </button>
          <button
            onClick={() => setSelected("matrix2")}
            className={`w-full h-8 flex items-center whitespace-nowrap rounded text-xs transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "matrix2"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Matrix 2" : "M2"}
          </button>
          <button
            onClick={() => setSelected("linkgen1")}
            className={`w-full h-8 flex items-center whitespace-nowrap rounded text-xs transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "linkgen1"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Link Generator 1" : "L1"}
          </button>
          <button
            onClick={() => setSelected("linkgen2")}
            className={`w-full h-8 flex items-center whitespace-nowrap rounded text-xs transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "linkgen2"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Link Generator 2" : "L2"}
          </button>
          <button
            onClick={() => setSelected("linkgen3")}
            className={`w-full h-8 flex items-center whitespace-nowrap rounded text-xs transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "linkgen3"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Link Generator 3" : "L3"}
          </button>
        </nav>

        {/* Crosshair toggle */}
        <div className={`mt-auto px-2 pb-4 ${sidebarOpen ? "" : "flex justify-center"}`}>
          <button
            onClick={() => setCrosshair(!crosshair)}
            className={`flex items-center gap-2 rounded text-xs transition-colors ${sidebarOpen ? "px-3 py-2 w-full" : "p-2 justify-center"} ${crosshair ? "text-gray-900" : "text-gray-400"} hover:bg-gray-100`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="7" cy="7" r="5" />
              <path d="M7 0v4M7 10v4M0 7h4M10 7h14" strokeLinecap="round" />
            </svg>
            {sidebarOpen && <span className="whitespace-nowrap">Table Crosshair</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {selected === "matrix1" && <SpacesPeople crosshair={crosshair} />}
        {selected === "matrix2" && <MatrixView crosshair={crosshair} />}
        {selected === "linkgen1" && <LinkGenerator />}
        {selected === "linkgen2" && <LinkGenerator2 />}
        {selected === "linkgen3" && <LinkGenerator3 />}
        {selected === "diagrams" && <DiagramsPage />}
        {selected === "beachwaves" && <BeachWavesPage />}
      </main>

      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}

export default App;
