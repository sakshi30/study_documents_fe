import {
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  X,
  XCircle,
} from "lucide-react";

const UploadHistory = ({ uploads, onRemoveUpload }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "ready":
        return <CheckCircle size={16} style={{ color: "#059669" }} />;
      case "processing":
        return <Clock size={16} style={{ color: "#d97706" }} />;
      case "failed":
        return <XCircle size={16} style={{ color: "#dc2626" }} />;
      default:
        return <Clock size={16} style={{ color: "#6b7280" }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "#059669";
      case "processing":
        return "#d97706";
      case "failed":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: "1rem",
          color: "#1f2937",
          fontSize: "1.125rem",
          fontWeight: "600",
        }}
      >
        Recent Uploads
      </h3>

      {uploads.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#6b7280",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          No uploads yet. Upload a document or add a link to get started.
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {uploads.map((upload) => (
            <div
              key={upload.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                position: "relative",
              }}
            >
              <button
                onClick={() => onRemoveUpload(upload.id)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "0.25rem",
                }}
                onMouseOver={(e) => (e.target.style.color = "#dc2626")}
                onMouseOut={(e) => (e.target.style.color = "#6b7280")}
              >
                <X size={16} />
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                {upload.type === "pdf" ? (
                  <FileText size={20} style={{ color: "#dc2626" }} />
                ) : (
                  <Globe size={20} style={{ color: "#3b82f6" }} />
                )}

                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: 0,
                      color: "#1f2937",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    {upload.title}
                  </h4>
                  <p
                    style={{ margin: 0, color: "#6b7280", fontSize: "0.75rem" }}
                  >
                    Added on {new Date(upload.dateAdded).toLocaleDateString()}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {getStatusIcon(upload.status)}
                  <span
                    style={{
                      color: getStatusColor(upload.status),
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {upload.status}
                  </span>
                </div>
              </div>

              {upload.status === "failed" && upload.error && (
                <div
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {upload.error}
                </div>
              )}

              {upload.status === "ready" && upload.summary && (
                <div
                  style={{
                    backgroundColor: "#f0f9ff",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "#1e40af",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Summary:
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#1f2937",
                      fontSize: "0.75rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {upload.summary}
                  </p>

                  {upload.type === "link" && upload.url && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <button
                        onClick={() => window.open(upload.url, "_blank")}
                        style={{
                          backgroundColor: "#059669",
                          color: "white",
                          border: "none",
                          borderRadius: "0.25rem",
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#047857")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#059669")
                        }
                      >
                        <ExternalLink
                          size={12}
                          style={{ marginRight: "0.25rem" }}
                        />
                        Open Original Link
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadHistory;
