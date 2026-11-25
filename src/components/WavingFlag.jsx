import { useEffect, useId, useState } from "react";

// Waving flags for the home hero, adapted from the main site's WavingFlag.
// Both are drawn at 3:2 (500 x 333) with the hoist at the pole.

const W = 500;
const H = 333;
const WAVE_A = `M0 0 Q125 -18 250 0 T${W} 0 L${W} ${H} Q375 ${H + 18} 250 ${H} T0 ${H} Z`;
const WAVE_B = `M0 0 Q125 18 250 0 T${W} 0 L${W} ${H} Q375 ${H - 18} 250 ${H} T0 ${H} Z`;

const FLAGS = {
  // JKLF flag: green over red, white triangle at the hoist.
  jklf: {
    label: "Flag of the Jammu Kashmir Liberation Front",
    draw: () => (
      <>
        <rect x="0" y="-20" width={W} height={H / 2 + 20} fill="#0b6b3a" />
        <rect x="0" y={H / 2} width={W} height={H / 2 + 20} fill="#b52025" />
        <path d={`M0 -20 L125 ${H / 2} L0 ${H + 20} Z`} fill="#ffffff" />
      </>
    ),
  },
  // Flag of Azad Jammu and Kashmir (official 648 x 432 construction, scaled).
  ajk: {
    label: "Flag of Azad Jammu and Kashmir",
    draw: () => (
      <>
        {/* Bleed above and below so the wave never shows a gap */}
        <rect x="0" y="-20" width={W / 2} height="20" fill="#ff9900" />
        <rect x={W / 2} y="-20" width={W / 2} height="20" fill="#01411c" />
        <rect x="0" y={H} width={W} height="20" fill="#01411c" />
        <g transform={`scale(${W / 648})`}>
          <rect x="324" y="0" width="324" height="216" fill="#01411c" />
          <rect x="0" y="0" width="324" height="216" fill="#ff9900" />
          <rect x="0" y="216" width="648" height="216" fill="#01411c" />
          {[240, 288, 336, 384].map((y) => (
            <rect key={y} x="0" y={y} width="648" height="24" fill="#ffffff" />
          ))}
          <g transform="translate(0 27)" fill="#ffffff">
            <path d="m468.409 14.7227a67.932 67.932 0 0 0-47.3008 64.623 67.932 67.932 0 0 0 67.9317 67.9317 67.932 67.932 0 0 0 61.8515-39.8653 62.271 62.271 0 0 1-44.4863 18.7696 62.271 62.271 0 0 1-62.2715-62.2715 62.271 62.271 0 0 1 24.2754-49.1875z" />
            <path d="m514.251 28.1218 28.6152 32.1923-42.0723-9.22464 39.4598-17.2662-21.7747 37.1629z" />
          </g>
        </g>
      </>
    ),
  },
};

function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function WavingFlag({ flag, className = "", delay = "0s" }) {
  const { label, draw } = FLAGS[flag];
  const reduced = usePrefersReducedMotion();
  const id = useId().replace(/:/g, "");
  const animate = (props) => (reduced ? null : { ...props, begin: delay });

  return (
    <svg className={className} viewBox="-30 -40 560 420" role="img" aria-label={label}>
      <title>{label}</title>
      <defs>
        <clipPath id={`wave-${id}`}>
          <path d={WAVE_A}>
            {!reduced && (
              <animate
                {...animate({})}
                attributeName="d"
                dur="4s"
                repeatCount="indefinite"
                values={`${WAVE_A};${WAVE_B};${WAVE_A}`}
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              />
            )}
          </path>
        </clipPath>

        {/* Light and shade bands that travel along the cloth */}
        <linearGradient
          id={`folds-${id}`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="250"
          y2="0"
          spreadMethod="repeat"
        >
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
          {!reduced && (
            <animateTransform
              {...animate({})}
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to="250 0"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>

      {/* Flagpole */}
      <rect x="-14" y="-34" width="8" height="414" rx="4" fill="rgba(255, 255, 255, 0.55)" />

      <g clipPath={`url(#wave-${id})`}>
        {draw()}
        <rect x="0" y="-20" width={W} height={H + 40} fill={`url(#folds-${id})`} />
      </g>
    </svg>
  );
}
