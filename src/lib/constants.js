export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const STOPWORDS = new Set([
  "the","and","that","this","have","for","you","was","are","with","not",
  "but","just","like","what","when","from","your","they","them","then",
  "than","will","would","could","should","about","there","here","been",
  "were","some","more","really","yeah","okay","haha","lmao","lmaooo",
  "dont","didnt","cant","wont","its","im","thats","gonna","wanna","got",
  "get","one","all","out","who","why","how","can","too","also","said",
  "know","think","going","right","need","want","time","good","yes",
  "because","don't","i'm","that's","it's","can't","didn't","won't",
  "you're","i've","we're","they're","need","were","into","only","even",
  "still","much","many","over","after","before","okay","actually",
  "message", "sent", "attachment", "liked", "edited", "poll", "reacted",
  "available",
]);

export function addStopwords(words) {
  words.forEach(name => {
    name
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.replace(/[^a-z0-9_']/g, ""))
      .filter(Boolean)
      .forEach(word => STOPWORDS.add(word));
  });
}

export const EMOJI_RE = /\p{Extended_Pictographic}/u;
export const WORD_RE = /[a-z0-9_']{4,}/g;

// Short, ambiguous roots — matched as whole words only (see profanity.js)
// so we don't count "class", "hello", "scrapped", etc.
export const SWEAR_EXACT_WORDS = ["ass", "hell", "damn", "crap"];

// Less ambiguous roots — matched with common suffixes allowed
// (e.g. "fucking", "shitty", "bitching").
export const SWEAR_WILDCARD_WORDS = ["fuck", "shit", "bitch", "bastard", "piss", "dick", "douche"];
