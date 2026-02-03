import { useState } from "react";
import SpacesPeople from "./SpacesPeople";
import MatrixView from "./MatrixView";
import { Agentation } from "agentation";

type Option = "option1" | "option2";

function App() {
  const [selected, setSelected] = useState<Option>("option1");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            onClick={() => setSelected("option1")}
            className={`w-full h-10 flex items-center whitespace-nowrap rounded text-sm transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "option1"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Option 1" : "1"}
          </button>
          <button
            onClick={() => setSelected("option2")}
            className={`w-full h-10 flex items-center whitespace-nowrap rounded text-sm transition-colors ${sidebarOpen ? "px-3" : "justify-center"} ${
              selected === "option2"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? "Option 2" : "2"}
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {selected === "option1" ? <SpacesPeople /> : <MatrixView />}
      </main>

      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}

export default App;
