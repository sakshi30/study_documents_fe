import { useState } from "react";
import ResultDetailModal from "./ResultDetailModal";
import UploadHistory from "./UploadHistoryModal";
import LinkInput from "./LinkInput";
import UploadArea from "./UploadArea";
import SearchBar from "./SearchBar";

const DocumentDashboard = ({ currentUser, onLogout }) => {
  const [uploads, setUploads] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleFileUpload = (newUpload) => {
    setUploads((prev) => [newUpload, ...prev]);

    // TODO: Replace with actual API call to backend
    // Simulate processing and summary generation

    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === newUpload.id
          ? {
              ...upload,
              status: "ready",
              summary:
                "Document processed and ready for search. Key insights extracted and indexed.",
            }
          : upload
      )
    );
  };

  const handleLinkAdd = (newLink) => {
    setUploads((prev) => [newLink, ...prev]);

    // TODO: Replace with actual API call to backend
    // Simulate processing

    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === newLink.id
          ? {
              ...upload,
              title: `Article added`,
              status: "ready",
              summary:
                "Web content extracted and summarized. Available for search and analysis.",
            }
          : upload
      )
    );
  };

  const handleSearch = (query) => {
    // TODO: Replace with actual Algolia search API call
    console.log("Searching for:", query);
    setSearchResults([]);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleRemoveUpload = (uploadId) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== uploadId));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        {/* Top Right User Info and Logout */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              marginRight: "1rem",
              color: "#374151",
              fontWeight: "500",
            }}
          >
            Hi, {currentUser?.email}
          </span>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>

        {/* Header */}
        <header style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1
            style={{
              color: "#1f2937",
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
            }}
          >
            Document Dashboard
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Upload, analyze, and search your documents and web content
          </p>
        </header>

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <UploadArea
              onFileUpload={handleFileUpload}
              currentUser={currentUser}
            />
            <LinkInput onLinkAdd={handleLinkAdd} currentUser={currentUser} />
          </div>

          {/* Right Column */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <UploadHistory
              uploads={uploads}
              onRemoveUpload={handleRemoveUpload}
            />
          </div>
        </div>

        {/* Search Section */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            padding: "2rem",
            marginTop: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              color: "#1f2937",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
            }}
          >
            Search Documents
          </h2>
          <SearchBar
            onSearch={handleSearch}
            searchResults={searchResults}
            onResultClick={handleResultClick}
          />
        </div>

        {/* Result Detail Modal */}
        {selectedResult && (
          <ResultDetailModal
            result={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentDashboard;
