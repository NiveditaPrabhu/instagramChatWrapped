import { useRef } from "react";
import { Upload, Sparkles } from "lucide-react";
import { STYLES } from "../styles";

export default function UploadScreen({ onFiles, loading, error }) {
  const inputRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
  };

  return (
    <div className="igw">
      <style>{STYLES}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "32px 20px",
          textAlign: "center",
        }}
      >
        <Sparkles size={30} color="#fa7e1e" />
        <h1 className="display gradient-text" style={{ fontSize: "34px", fontWeight: 700, margin: 0 }}>
          Group Chat Wrapped
        </h1>
        <p className="muted" style={{ maxWidth: 380, margin: 0, fontSize: 15, lineHeight: 1.5 }}>
          Turn one Instagram group chat export into a wrapped-style recap — top
          texter, favorite emojis, busiest hours, and more. Everything runs
          right here in your browser.
        </p>

        <div
          className="dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          style={{ width: "100%", maxWidth: 380 }}
        >
          <Upload size={22} style={{ marginBottom: 8 }} />
          <p style={{ margin: 0, fontSize: 14 }}>
            Drop your <span className="mono">message_1.json</span> file(s)
            here, or tap to browse
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".json"
            multiple
            hidden
            onChange={(e) => e.target.files?.length && onFiles(e.target.files)}
          />
        </div>

        {loading && <p className="muted">Reading your chat…</p>}
        {error && <p className="error-text">{error}</p>}

        <details className="howto">
          <summary>Where do I get these files?</summary>
          <ol>
            <li>Instagram app → Settings → Accounts Center → Your information and permissions → Download your information</li>
            <li>Choose "Some of your information" → select Messages → format JSON</li>
            <li>Once Instagram emails you the export, unzip it and open <span className="mono">inbox/&lt;your group chat folder&gt;/</span></li>
            <li>Upload every <span className="mono">message_N.json</span> file from that folder here (large chats are split across several)</li>
          </ol>
        </details>
      </div>
    </div>
  );
}
