export default function ProgressDots({ count, activeIndex }) {
  return (
    <div className="progress">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`dot ${i <= activeIndex ? "active" : ""}`} />
      ))}
    </div>
  );
}
