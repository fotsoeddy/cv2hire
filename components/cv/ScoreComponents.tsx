import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";

export function ScoreBadge({ score }: { score: number }) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        color === "green" && "score-badge-green",
        color === "yellow" && "score-badge-yellow",
        color === "red" && "score-badge-red"
      )}
    >
      {label}
    </div>
  );
}

export function ScoreCircle({ score = 75 }: { score: number }) {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg height="100%" width="100%" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle cx="50" cy="50" r={normalizedRadius} stroke="#27282f" strokeWidth={stroke} fill="transparent" />
        <defs>
          <linearGradient id="scoreGrad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CAC5FE" />
            <stop offset="100%" stopColor="#606beb" />
          </linearGradient>
        </defs>
        <circle
          cx="50" cy="50" r={normalizedRadius}
          stroke="url(#scoreGrad)" strokeWidth={stroke}
          fill="transparent" strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset} strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm text-white">{score}/100</span>
      </div>
    </div>
  );
}

export function ScoreGauge({ score = 75 }: { score: number }) {
  // We use an approximate path length for the semicircle
  const pathLength = 125.66;
  const percentage = score / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CAC5FE" />
              <stop offset="100%" stopColor="#606beb" />
            </linearGradient>
          </defs>
          <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#27282f" strokeWidth="10" strokeLinecap="round" />
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none" stroke="url(#gaugeGrad)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-xl font-semibold text-white pt-4">{score}/100</div>
        </div>
      </div>
    </div>
  );
}
