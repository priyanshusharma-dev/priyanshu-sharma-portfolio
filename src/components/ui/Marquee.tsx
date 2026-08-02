"use client";

/*
 *  A smooth infinite horizontal scroll band (like a stock ticker).
 *  We use pure CSS animation for perf — no JS needed.
 */
export default function Marquee({
  items,
  speed = 30,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  // Duplicate the items so the loop is seamless
  const loop = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-6 border-y border-white/10">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="text-4xl md:text-6xl font-bold text-white/15 hover:text-emerald-500 transition-colors duration-300 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {item}
            <span className="text-emerald-500 mx-8">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}