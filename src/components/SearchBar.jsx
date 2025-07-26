import { FileText, Globe, Search } from "lucide-react";
import algoliasearch from "algoliasearch/lite";
import { useState } from "react";

const SearchBar = ({ onResultClick, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const ALGOLIA_KEY = import.meta.env.VITE_ALGOLIA_KEY;
  const ALGOLIA_APP = import.meta.env.VITE_ALGOLIA_APP;

  const searchClient = algoliasearch(ALGOLIA_APP, ALGOLIA_KEY);

  const index = searchClient.initIndex("study_documents"); // Replace with your actual Algolia index name
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const result = await index.search(searchQuery.trim(), {
          hitsPerPage: 5,
          filters: `user_id:${currentUser.id}`,
        });

        const formattedResults = result.hits.map((hit) => ({
          id: hit.objectID,
          title: hit.title,
          type: hit.type || "web",
          summary: hit.summary || "",
          key_points: hit.key_points || "",
          url: hit.source || "",
        }));
        setSearchResults(formattedResults);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <Search
          size={20}
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6b7280",
          }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for keyword and press enter..."
          style={{
            width: "100%",
            padding: "1rem 1rem 1rem 2.5rem",
            border: "2px solid #e5e7eb",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>

      {searchResults.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => onResultClick(result)}
              style={{
                padding: "1rem",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9fafb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                {result.type !== "url" ? (
                  <FileText size={16} style={{ color: "#dc2626" }} />
                ) : (
                  <Globe size={16} style={{ color: "#3b82f6" }} />
                )}
                <h4
                  style={{
                    margin: 0,
                    color: "#1f2937",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  {result.title}
                </h4>
                <span
                  style={{
                    backgroundColor:
                      result.type === "pdf" ? "#fef2f2" : "#eff6ff",
                    color: result.type === "pdf" ? "#dc2626" : "#3b82f6",
                    padding: "0.125rem 0.5rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  {result.type.toUpperCase()}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  lineHeight: "1.4",
                }}
              >
                {result.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
