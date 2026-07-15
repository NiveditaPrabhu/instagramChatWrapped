import { useCallback, useState } from "react";
import UploadScreen from "./components/UploadScreen";
import WrappedView from "./components/WrappedView";
import { parseExportFiles } from "./lib/parseExport";
import { computeStats } from "./lib/stats";

export default function App() {
  const [messages, setMessages] = useState(null);
  const [stats, setStats] = useState(null);
  const [chatTitle, setChatTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = useCallback(async (fileList) => {
    setLoading(true);
    setError("");
    try {
      const { messages: parsedMessages, title } = await parseExportFiles(fileList);

      if (parsedMessages.length === 0) {
        setError(
          "No messages found in those files. Make sure you're uploading message_1.json (and message_2.json, etc.) from inbox/<chat name>/ in your Instagram export."
        );
        setLoading(false);
        return;
      }

      setChatTitle(title || "Group Chat");
      setMessages(parsedMessages);
      setStats(computeStats(parsedMessages));
    } catch (e) {
      setError("Couldn't parse those files — double check you selected the message_*.json files from your export.");
    }
    setLoading(false);
  }, []);

  const reset = () => {
    setMessages(null);
    setStats(null);
    setChatTitle("");
    setError("");
  };

  if (!stats) {
    return <UploadScreen onFiles={handleFiles} loading={loading} error={error} />;
  }

  return <WrappedView stats={stats} messages={messages} chatTitle={chatTitle} onReset={reset} />;
}
