import { Link } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const LinkInput = ({ onLinkAdd, currentUser }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [validationError, setValidationError] = useState("");
  const BASEURL = import.meta.env.VITE_BASEURL;

  const validateUrl = (url) => {
    try {
      new URL(url);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  };

  const handleAddLink = async () => {
    toast.info("Pasing link... please wait");
    setValidationError("");

    if (!linkUrl.trim()) {
      setValidationError("Please enter a URL");
      return;
    }

    const error = validateUrl(linkUrl);
    if (error) {
      setValidationError(error);
      return;
    }

    // TODO: Replace with actual API call
    try {
      const formDataToSend = {
        link: linkUrl,
        id: currentUser.id,
      };

      const response = await fetch(`${BASEURL}add-links`, {
        method: "POST",
        body: JSON.stringify(formDataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Successful authentication

        onLinkAdd({
          id: Date.now().toString(),
          type: "link",
          title: `Link: ${linkUrl}`,
          url: linkUrl,
          status: "success",
          dateAdded: new Date().toISOString().split("T")[0],
        });
        toast.success("Link added successfully");
      }
    } catch (error) {
      console.error("Auth error:", error);
      onLinkAdd({
        id: Date.now().toString(),
        type: "link",
        title: `Link: ${linkUrl}`,
        url: linkUrl,
        status: "error",
        dateAdded: new Date().toISOString().split("T")[0],
      });
      toast.error("Link upload failed");
    }

    setLinkUrl("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3
        style={{
          marginBottom: "1rem",
          color: "#1f2937",
          fontSize: "1.125rem",
          fontWeight: "600",
        }}
      >
        Add Web Links
      </h3>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Link
            size={20}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6b7280",
            }}
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Paste a web link here..."
            style={{
              width: "100%",
              padding: "0.75rem 0.75rem 0.75rem 2.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <button
          onClick={handleAddLink}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            padding: "0.75rem 1rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Add Link
        </button>
      </div>

      {validationError && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
          }}
        >
          {validationError}
        </div>
      )}
    </div>
  );
};

export default LinkInput;
