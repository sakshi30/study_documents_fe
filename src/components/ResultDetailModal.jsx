import { ExternalLink, FileText, Globe, X } from "lucide-react";

const ResultDetailModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: "0.5rem",
          position: "relative",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {result.type !== "url" ? (
              <FileText size={50} style={{ color: "#dc2626" }} />
            ) : (
              <Globe size={50} style={{ color: "#3b82f6" }} />
            )}
            <h2
              style={{
                margin: 0,
                color: "#1f2937",
                fontSize: "1.25rem",
                fontWeight: "600",
              }}
            >
              {result.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              padding: "0.25rem",
            }}
            onMouseOver={(e) => (e.target.style.color = "#374151")}
            onMouseOut={(e) => (e.target.style.color = "#6b7280")}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <h3
            style={{
              color: "#1f2937",
              marginBottom: "1rem",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Full Summary
          </h3>
          <p
            style={{
              color: "#374151",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            {result.summary}
          </p>
          <h3
            style={{
              color: "#1f2937",
              marginBottom: "1rem",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Key Points{" "}
            {result.key_points.length > 0 &&
              "(" + result.key_points.length + ")"}
          </h3>
          <ul
            style={{
              color: "#374151",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            {result.key_points.map((point, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {index + 1}. {point}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {result.type === "url" && result.url && (
              <button
                onClick={() => window.open(result.url, "_blank")}
                style={{
                  backgroundColor: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#047857")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#059669")}
              >
                <ExternalLink size={16} />
                Open Web Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailModal;
