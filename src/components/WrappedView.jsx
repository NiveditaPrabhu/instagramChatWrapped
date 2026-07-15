import { useRef, useState } from "react";
import { Heart, Image as ImageIcon, Film, Sticker, Angry, Reply } from "lucide-react";
import { STYLES } from "../styles";
import ProgressDots from "./ProgressDots";
import IntroSlide from "./slides/IntroSlide";
import TotalMessagesSlide from "./slides/TotalMessagesSlide";
import TopTextersSlide from "./slides/TopTextersSlide";
import BusiestTimesSlide from "./slides/BusiestTimesSlide";
import TopEmojisSlide from "./slides/TopEmojisSlide";
import TopWordsSlide from "./slides/TopWordsSlide";
import TopWordsByPersonSlide from "./slides/TopWordsByPersonSlide";
import RankingSlide from "./slides/RankingSlide";
import WordSearchSlide from "./slides/WordSearchSlide";
import RecapSlide from "./slides/RecapSlide";

export default function WrappedView({ stats, messages, chatTitle, onReset }) {
  const scrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const participantCount = Object.keys(stats.perPerson).length;
  const hasEmojis = Object.keys(stats.emojiCounts).length > 0;
  const hasWords = Object.keys(stats.wordCounts).length > 0;
  const hasWordsByPerson = Object.values(stats.wordCountsByPerson).some(
    (words) => Object.keys(words).length > 0
  );
  const hasLikes = Object.keys(stats.reactionCounts).length > 0;
  const hasImages = Object.keys(stats.images).length > 0;
  const hasReels = Object.keys(stats.reels).length > 0;
  const hasStickers = Object.keys(stats.stickers).length > 0;
  const hasSwears = Object.keys(stats.swearCounts).length > 0;
  const hasReplies = stats.replyCounts !== null && Object.keys(stats.replyCounts).length > 0;

  // Drives both the progress dots and which slides render, in order —
  // keeping these in sync in one place avoids the dot count drifting
  // from the actual number of rendered slides.
  const slideFlags = [
    true, // intro
    true, // total messages
    true, // top texters
    true, // busiest times
    hasLikes,
    hasImages,
    hasReels,
    hasStickers,
    hasEmojis,
    hasWords,
    hasWordsByPerson,
    hasSwears,
    hasReplies,
    true, // word search (always available, it's interactive)
    true, // recap
  ];
  const slideCount = slideFlags.filter(Boolean).length;

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActiveSlide(idx);
  };

  return (
    <div className="igw">
      <style>{STYLES}</style>
      <ProgressDots count={slideCount} activeIndex={activeSlide} />

      <div className="scroller" ref={scrollRef} onScroll={onScroll}>
        <IntroSlide
          chatTitle={chatTitle}
          firstTs={stats.firstTs}
          lastTs={stats.lastTs}
          participantCount={participantCount}
        />
        <TotalMessagesSlide totalMessages={stats.totalMessages} activeDays={stats.activeDays} />
        <TopTextersSlide perPerson={stats.perPerson} />
        <BusiestTimesSlide
          busiestWeekday={stats.busiestWeekday}
          busiestHour={stats.busiestHour}
          busiestDay={stats.busiestDay}
        />

        {hasLikes && (
          <RankingSlide
            icon={Heart}
            iconColor="#d62976"
            eyebrow="Generous with the double-tap"
            title="Who likes the most messages"
            data={stats.reactionCounts}
            unitLabel="likes given"
            footer={(name) => (
              <>
                <span className="gradient-text" style={{ fontWeight: 600 }}>{name}</span> hands out the most reactions.
              </>
            )}
          />
        )}

        {hasImages && (
          <RankingSlide
            icon={ImageIcon}
            iconColor="#fa7e1e"
            title="Who sends the most images"
            data={stats.images}
            unitLabel="photos"
          />
        )}

        {hasReels && (
          <RankingSlide
            icon={Film}
            iconColor="#962fbf"
            title="Who sends the most reels"
            data={stats.reels}
            unitLabel="reels"
          />
        )}

        {hasStickers && (
          <RankingSlide
            icon={Sticker}
            iconColor="#4f5bd5"
            title="Who sends the most stickers"
            data={stats.stickers}
            unitLabel="stickers"
          />
        )}

        {hasEmojis && <TopEmojisSlide emojiCounts={stats.emojiCounts} />}
        {hasWords && <TopWordsSlide wordCounts={stats.wordCounts} />}
        {hasWordsByPerson && (
          <TopWordsByPersonSlide wordCountsByPerson={stats.wordCountsByPerson} perPerson={stats.perPerson} />
        )}

        {hasSwears && (
          <RankingSlide
            icon={Angry}
            iconColor="#feda75"
            title="Who swears the most"
            data={stats.swearCounts}
            unitLabel="swears"
          />
        )}

        {hasReplies && (
          <RankingSlide
            icon={Reply}
            iconColor="#d62976"
            title="Who replies the most"
            data={stats.replyCounts}
            unitLabel="replies"
          />
        )}

        <WordSearchSlide messages={messages} />

        <RecapSlide stats={stats} onReset={onReset} />
      </div>
    </div>
  );
}
