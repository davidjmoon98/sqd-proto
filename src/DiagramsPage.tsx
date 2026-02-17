import { useState, useEffect } from "react";
import { renderMermaid, THEMES } from "beautiful-mermaid";

const diagrams = [
  {
    title: "Flowchart",
    code: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process Data]
    B -->|No| D[Skip]
    C --> E[Save Results]
    D --> E
    E --> F[End]`,
  },
  {
    title: "Sequence Diagram",
    code: `sequenceDiagram
    User->>Frontend: Click Button
    Frontend->>API: POST /generate
    API->>Database: Query Data
    Database-->>API: Return Results
    API-->>Frontend: JSON Response
    Frontend-->>User: Display Results`,
  },
  {
    title: "State Diagram",
    code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: fetch
    Loading --> Success: resolve
    Loading --> Error: reject
    Success --> Idle: reset
    Error --> Idle: retry
    Success --> [*]`,
  },
  {
    title: "Class Diagram",
    code: `classDiagram
    class User {
      +String name
      +String email
      +login()
      +logout()
    }
    class Admin {
      +manageUsers()
    }
    User <|-- Admin`,
  },
];

const themeOptions = [
  "zinc-light",
  "zinc-dark",
  "tokyo-night",
  "catppuccin-mocha",
  "catppuccin-latte",
  "nord",
  "dracula",
  "github-light",
  "github-dark",
] as const;

export default function DiagramsPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>("zinc-light");
  const [renderedDiagrams, setRenderedDiagrams] = useState<{ title: string; svg: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderAll = async () => {
      setLoading(true);
      const theme = THEMES[selectedTheme as keyof typeof THEMES];
      const results = await Promise.all(
        diagrams.map(async (d) => {
          try {
            const svg = await renderMermaid(d.code, theme);
            return { title: d.title, svg };
          } catch (err) {
            console.error(`Error rendering ${d.title}:`, err);
            return { title: d.title, svg: `<p class="text-red-500">Error rendering diagram</p>` };
          }
        })
      );
      setRenderedDiagrams(results);
      setLoading(false);
    };
    renderAll();
  }, [selectedTheme]);

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      <h1 className="text-sm text-black mb-8">Mermaid Diagrams</h1>

      {/* Theme Selector */}
      <div className="mb-8">
        <label className="text-xs text-black block mb-2">Select Theme</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded text-xs cursor-pointer hover:border-gray-300 transition-colors outline-none"
        >
          {themeOptions.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* Diagrams Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-xs text-gray-400">Rendering diagrams...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderedDiagrams.map((d) => (
            <div key={d.title} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xs text-black mb-4">{d.title}</h2>
              <div
                className="overflow-auto"
                dangerouslySetInnerHTML={{ __html: d.svg }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
