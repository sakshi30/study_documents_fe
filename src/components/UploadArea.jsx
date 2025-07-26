import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const UploadArea = ({ onFileUpload, currentUser }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState("");
  const fileInputRef = useRef(null);
  const BASEURL = import.meta.env.VITE_BASEURL;

  const validateFile = (file) => {
    const allowedTypes = ["application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF files are supported";
    }
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFiles = async (files) => {
    toast.info("Uploading file...");
    setValidationError("");
    const file = files[0];

    if (file) {
      const error = validateFile(file);
      if (error) {
        setValidationError(error);
        return;
      }

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("files", file);
        formDataToSend.append("id", currentUser.id);

        const response = await fetch(`${BASEURL}upload-files`, {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          // Successful authentication

          onFileUpload({
            id: Date.now().toString(),
            type: "pdf",
            title: file.name,
            status: "success",
            dateAdded: new Date().toISOString().split("T")[0],
            file: file,
          });
          toast.success("File uploaded successfully");
        }
      } catch (error) {
        console.error("Auth error:", error);
        onFileUpload({
          id: Date.now().toString(),
          type: "pdf",
          title: file.name,
          status: "error",
          dateAdded: new Date().toISOString().split("T")[0],
          file: file,
        });
        toast.error("File upload failed");
      }
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
    fileInputRef.current.value = null;
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
        Upload Documents
      </h3>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragOver ? "#3b82f6" : "#d1d5db"}`,
          borderRadius: "0.5rem",
          padding: "2rem",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragOver ? "#eff6ff" : "#f9fafb",
          transition: "all 0.2s ease",
        }}
      >
        <Upload size={48} style={{ color: "#6b7280", margin: "0 auto 1rem" }} />
        <p style={{ color: "#374151", marginBottom: "0.5rem" }}>
          Drop PDF files here or click to browse
        </p>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Maximum file size: 10MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      {validationError && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            marginTop: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {validationError}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
