import { useState, useRef, useEffect } from "react";

const TRADITIONS = ["Egyptian", "Norse", "Celtic", "Greek", "Japanese"];

const TRADITION_COLORS = {
  Egyptian: "#c8a96e",
  Norse: "#7c9fc8",
  Celtic: "#7cb87c",
  Greek: "#c87c7c",
  Japanese: "#c87cb8",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0a0a0f",
    color: "#e8e0d0",
    fontFamily: "'Inter', sans-serif",
    padding: "0",
  },
  header: {
    borderBottom: "1px solid #2a1f35",
    padding: "2rem 2.5rem 1.5rem",
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.1rem",
    letterSpacing: "0.25em",
    color: "#c8a96e",
    margin: 0,
    fontWeight: 400,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "0.7rem",
    color: "#5a5060",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  main: {
    maxWidth: "820px",
    margin: "0 auto",
    padding: "2.5rem 2rem",
  },
  searchArea: {
    marginBottom: "2.5rem",
  },
  inputRow: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "stretch",
  },
  input: {
    flex: 1,
    background: "#1a1520",
    border: "1px solid #2a1f35",
    borderRadius: "2px",
    color: "#e8e0d0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    padding: "0.85rem 1.1rem",
    outline: "none",
    transition: "border-color 0.2s",
    letterSpacing: "0.02em",
  },
  button: {
    background: "transparent",
    border: "1px solid #c8a96e",
    borderRadius: "2px",
    color: "#c8a96e",
    fontFamily: "'Cinzel', serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    padding: "0.85rem 1.5rem",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  hint: {
    marginTop: "0.75rem",
    fontSize: "0.72rem",
    color: "#3a3040",
    letterSpacing: "0.1em",
  },
  savedRow: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  savedTag: {
    background: "#1a1520",
    border: "1px solid #2a1f35",
    borderRadius: "2px",
    color: "#7c6fa0",
    fontSize: "0.68rem",
    letterSpacing: "0.1em",
    padding: "0.3rem 0.7rem",
    cursor: "pointer",
    fontFamily: "'Cinzel', serif",
    textTransform: "uppercase",
    transition: "border-color 0.2s",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "2rem 0",
    color: "#5a5060",
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  dot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#c8a96e",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  queryTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    color: "#5a5060",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid #1a1520",
  },
  queryWord: {
    color: "#c8a96e",
    marginLeft: "0.5rem",
  },
  traditionBlock: {
    borderTop: "1px solid #1e1828",
    padding: "1.5rem 0",
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    gap: "1.5rem",
    alignItems: "start",
  },
  traditionLabel: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    paddingTop: "0.15rem",
  },
  traditionContent: {
    fontSize: "0.88rem",
    lineHeight: "1.75",
    color: "#c8c0b8",
  },
  connectionsSection: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #1a1520",
  },
  connectionsLabel: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "#5a5060",
    textTransform: "uppercase",
    marginBottom: "0.6rem",
  },
  connectionsList: {
    fontSize: "0.82rem",
    color: "#9a8fa8",
    lineHeight: "1.6",
    fontStyle: "italic",
  },
  annotateRow: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #2a1f35",
    display: "flex",
    gap: "0.75rem",
  },
  annotateInput: {
    flex: 1,
    background: "#0f0c14",
    border: "1px solid #1e1828",
    borderRadius: "2px",
    color: "#e8e0d0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.82rem",
    padding: "0.6rem 0.9rem",
    outline: "none",
    fontStyle: "italic",
    letterSpacing: "0.02em",
  },
  annotateBtn: {
    background: "transparent",
    border: "1px solid #2a1f35",
    borderRadius: "2px",
    color: "#5a5060",
    fontFamily: "'Cinzel', serif",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    padding: "0.6rem 1rem",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  savedEntries: {
    marginTop: "3rem",
    paddingTop: "2rem",
    borderTop: "1px solid #1a1520",
  },
  savedHeader: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    color: "#3a3040",
    textTransform: "uppercase",
    marginBottom: "1.25rem",
  },
  savedEntry: {
    background: "#0f0c14",
    border: "1px solid #1e1828",
    borderRadius: "2px",
    padding: "1rem 1.25rem",
    marginBottom: "0.75rem",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "1rem",
    alignItems: "start",
  },
  savedQuery: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.68rem",
    color: "#c8a96e",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "0.35rem",
  },
  savedNote: {
    fontSize: "0.8rem",
    color: "#7a7080",
    fontStyle: "italic",
    lineHeight: "1.5",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#2a1f35",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "0",
    lineHeight: 1,
    transition: "color 0.2s",
  },
  error: {
    color: "#c87c7c",
    fontSize: "0.82rem",
    padding: "1.5rem 0",
    letterSpacing: "0.05em",
  },
};

const SYSTEM_PROMPT = `You are a deep researcher of magical traditions, comparative mythology, and esoteric systems. You have intimate knowledge of Egyptian, Norse/Viking, Celtic, Greek/Hellenic, and Japanese magical and spiritual traditions.

When given a concept, symbol, object, deity, or theme, respond with a structured analysis across all five traditions. For each tradition, describe:
- How this concept manifests or is understood
- Key associated deities, symbols, or practices
- The deeper metaphysical or magical significance

Then identify the cross-tradition connections — the threads that link these separate systems at the root.

Be direct, specific, and substantive. Avoid vague generalities. Go to the interesting and obscure where it illuminates. Write with the assumption that the reader already understands the surface level — go deeper.

Format your response as valid JSON only, no markdown, no preamble:
{
  "traditions": {
    "Egyptian": "...",
    "Norse": "...",
    "Celtic": "...",
    "Greek": "...",
    "Japanese": "..."
  },
  "connections": "..."
}`;

export default function MagicResearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [annotation, setAnnotation] = useState("");
  const [saved, setSaved] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Load saved entries from storage
    const loadSaved = async () => {
      try {
        const result = await window.storage.get("magic-research-saved");
        if (result) setSaved(JSON.parse(result.value));
      } catch {}
    };
    loadSaved();
  }, []);

  const persistSaved = async (entries) => {
    try {
      await window.storage.set("magic-research-saved", JSON.stringify(entries));
    } catch {}
  };

  const research = async (q) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setCurrentQuery(searchQuery.trim());
    setAnnotation("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: searchQuery.trim() }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResults(parsed);
    } catch (err) {
      setError("The connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") research();
  };

  const saveEntry = async () => {
    if (!results || !currentQuery) return;
    const entry = {
      id: Date.now(),
      query: currentQuery,
      note: annotation,
      results,
    };
    const updated = [entry, ...saved];
    setSaved(updated);
    await persistSaved(updated);
    setAnnotation("");
  };

  const deleteEntry = async (id) => {
    const updated = saved.filter((e) => e.id !== id);
    setSaved(updated);
    await persistSaved(updated);
  };

  const quickSearch = (term) => {
    setQuery(term);
    research(term);
  };

  const SEEDS = ["serpent", "threshold", "fire offering", "moon", "the eye", "underworld passage"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { border-color: #c8a96e !important; }
        button:hover { opacity: 0.8; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .dot2 { animation-delay: 0.3s; }
        .dot3 { animation-delay: 0.6s; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2a1f35; }
      `}</style>

      <div style={styles.app}>
        <header style={styles.header}>
          <h1 style={styles.title}>Arcana</h1>
          <span style={styles.subtitle}>Cross-tradition research</span>
        </header>

        <main style={styles.main}>
          <div style={styles.searchArea}>
            <div style={styles.inputRow}>
              <input
                ref={inputRef}
                style={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Enter a concept, symbol, or force..."
                spellCheck={false}
              />
              <button style={styles.button} onClick={() => research()}>
                Research
              </button>
            </div>
            <div style={styles.hint}>
              Egyptian · Norse · Celtic · Greek · Japanese
            </div>
            <div style={styles.savedRow}>
              {SEEDS.map((s) => (
                <button
                  key={s}
                  style={styles.savedTag}
                  onClick={() => quickSearch(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div style={styles.loading}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={styles.dot} />
                <div style={{ ...styles.dot, animationDelay: "0.3s" }} />
                <div style={{ ...styles.dot, animationDelay: "0.6s" }} />
              </div>
              searching across traditions
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          {results && (
            <div style={styles.results}>
              <div style={styles.queryTitle}>
                Research —<span style={styles.queryWord}>{currentQuery}</span>
              </div>

              {TRADITIONS.map((t) => (
                <div key={t} style={styles.traditionBlock}>
                  <div
                    style={{
                      ...styles.traditionLabel,
                      color: TRADITION_COLORS[t],
                    }}
                  >
                    {t}
                  </div>
                  <div style={styles.traditionContent}>
                    {results.traditions?.[t] || "—"}
                  </div>
                </div>
              ))}

              {results.connections && (
                <div style={styles.connectionsSection}>
                  <div style={styles.connectionsLabel}>
                    Connections
                  </div>
                  <div style={styles.connectionsList}>
                    {results.connections}
                  </div>
                </div>
              )}

              <div style={styles.annotateRow}>
                <input
                  style={styles.annotateInput}
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  placeholder="Add a note before saving..."
                />
                <button style={styles.annotateBtn} onClick={saveEntry}>
                  Save
                </button>
              </div>
            </div>
          )}

          {saved.length > 0 && (
            <div style={styles.savedEntries}>
              <div style={styles.savedHeader}>Collected</div>
              {saved.map((entry) => (
                <div key={entry.id} style={styles.savedEntry}>
                  <div>
                    <div style={styles.savedQuery}>{entry.query}</div>
                    {entry.note && (
                      <div style={styles.savedNote}>{entry.note}</div>
                    )}
                  </div>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteEntry(entry.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
