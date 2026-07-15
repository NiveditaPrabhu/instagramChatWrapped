const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');";

export const STYLES = `
${FONT_IMPORT}
.igw {
  --bg: #150e17;
  --card: #20141f;
  --cream: #f7eee3;
  --muted: #b6a7c4;
  --g1: #feda75;
  --g2: #fa7e1e;
  --g3: #d62976;
  --g4: #962fbf;
  --g5: #4f5bd5;
  background: var(--bg);
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.igw .gradient-text {
  background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 30%, var(--g3) 60%, var(--g4) 85%, var(--g5) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.igw .display {
  font-family: 'Space Grotesk', sans-serif;
}
.igw .mono {
  font-family: 'IBM Plex Mono', monospace;
}
.igw .muted { color: var(--muted); }
.igw .scroller {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.igw .slide {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  position: relative;
  text-align: center;
}
.igw .progress {
  position: fixed;
  top: 14px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 5px;
  z-index: 20;
}
.igw .dot {
  flex: 1;
  height: 3px;
  border-radius: 3px;
  background: rgba(247,238,227,0.18);
  overflow: hidden;
}
.igw .dot.active {
  background: linear-gradient(90deg, var(--g2), var(--g3));
}
.igw .card {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(247,238,227,0.08);
}
.igw .rank-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}
.igw .rank-bar-track {
  flex: 1;
  height: 10px;
  border-radius: 6px;
  background: rgba(247,238,227,0.08);
  overflow: hidden;
}
.igw .rank-bar-fill {
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--g2), var(--g3), var(--g4));
}
.igw .emoji-chip {
  background: var(--card);
  border-radius: 16px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(247,238,227,0.08);
}
.igw .word-tag {
  background: var(--card);
  border: 1px solid rgba(247,238,227,0.1);
  border-radius: 999px;
  padding: 8px 16px;
  font-family: 'Space Grotesk', sans-serif;
}
.igw .dropzone {
  border: 1.5px dashed rgba(247,238,227,0.3);
  border-radius: 20px;
  padding: 36px 20px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.igw .dropzone:hover {
  border-color: var(--g3);
  background: rgba(214,41,118,0.06);
}
.igw .howto {
  text-align: left;
  color: var(--muted);
  font-size: 13px;
  max-width: 420px;
}
.igw .howto summary {
  cursor: pointer;
  color: var(--cream);
  font-weight: 500;
  margin-bottom: 8px;
}
.igw .howto ol {
  padding-left: 18px;
  line-height: 1.6;
}
.igw .btn {
  background: linear-gradient(135deg, var(--g2), var(--g3));
  color: var(--cream);
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.igw .word-input {
  background: var(--card);
  border: 1px solid rgba(247,238,227,0.15);
  border-radius: 999px;
  padding: 12px 18px;
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
}
.igw .word-input:focus {
  border-color: var(--g3);
}
.igw .word-input::placeholder {
  color: var(--muted);
}
.igw .error-text {
  color: #ff9d9d;
  font-size: 14px;
  max-width: 380px;
}
.igw .bounce {
  animation: igwBounce 1.6s ease-in-out infinite;
}
@keyframes igwBounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(6px); opacity: 1; }
}
`;
