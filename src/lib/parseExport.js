import { fixEncoding } from "./encoding";

// Reads and merges one or more message_N.json files from an Instagram
// export into a single message array plus the chat title.
export async function parseExportFiles(fileList) {
  const files = Array.from(fileList);
  const parsed = await Promise.all(files.map(async (f) => JSON.parse(await f.text())));

  let allMessages = [];
  let title = "";

  parsed.forEach((p) => {
    if (Array.isArray(p.messages)) allMessages = allMessages.concat(p.messages);
    if (p.title && !title) title = fixEncoding(p.title);
  });

  return { messages: allMessages, title };
}
