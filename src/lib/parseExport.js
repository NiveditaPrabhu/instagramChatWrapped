import { fixEncoding } from "./encoding";
import { STOPWORDS, addStopwords } from "./constants";

// Reads and merges one or more message_N.json files from an Instagram
// export into a single message array plus the chat title.
export async function parseExportFiles(fileList) {
  const files = Array.from(fileList);
  const parsed = await Promise.all(files.map(async (f) => JSON.parse(await f.text())));

  let allMessages = [];
  let title = "";
  let participants = [];
  let usernames = [];

  parsed.forEach((p) => {
    if (Array.isArray(p.messages)) {
      allMessages = allMessages.concat(p.messages);

      p.messages.forEach((message) => {
        if (message.content) {
          const match = message.content.match(/^([\w.]+)\s+(liked|reacted|sent)/i);

          if (match) {
            usernames.push(match[1]);
          }
        }
      });
    }

    if (Array.isArray(p.participants)) {
      participants = participants.concat(
        p.participants.map(person => fixEncoding(person.name))
      );
    }

    if (p.title && !title) title = fixEncoding(p.title);
  });

  addStopwords(participants);
  addStopwords(usernames);

  return { messages: allMessages, title };
}
