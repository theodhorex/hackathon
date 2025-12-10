import React, { useRef, useEffect } from "react";

type Props = {
  src?: string;
  width?: number;
  height?: number;
  intensity?: number; // 0.0 - 1.0, pengaruh displacement & glow
  ariaLabel?: string;
};

export default function NeonBlobAdvanced({
  src = "/assets/blob.png",
  width = 520,
  height = 520,
  intensity = 0.7,
  ariaLabel = "Animated neon blob",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const seedRef = useRef<number>(Math.floor(Math.random() * 10000));

  // Slight runtime tweaks: lower motion on reduced-motion setting
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.style.animationPlayState = "paused";
    }
  }, []);

  // map intensity to filter params
  const dispScale = 30 * Math.min(Math.max(intensity, 0), 1); // px
  const baseFreq = 0.012 + (1 - intensity) * 0.02; // turbulence baseFrequency

  // unique ids so multiple components can coexist
  const uid = `nb-${seedRef.current}`;

  return (
    <div
      ref={rootRef}
      className="nba-root"
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* SVG filters for displacement + glow */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id={`${uid}-turb`}>
            {/* turbulence animated via SMIL <animate> */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFreq}
              numOctaves="2"
              seed={seedRef.current}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values={`${baseFreq}; ${baseFreq * 1.6}; ${baseFreq}`}
                dur="9s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="seed"
                values={`${seedRef.current}; ${seedRef.current + 10}; ${seedRef.current}`}
                dur="17s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={dispScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            {/* subtle chromatic spread (fake chroma) */}
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>

          {/* Glow using gaussian blur + composite */}
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Layer container */}
      <div className="nba-layer-wrap">
        {/* blurred neon glow layer (uses CSS hue-rotate for color variety) */}
        <img
          src={src}
          className="nba-layer glow-layer"
          alt=""
          aria-hidden
          style={{ transform: `scale(1.06)` }}
        />

        {/* displaced core layer (SVG filter applied) */}
        <img
          src={src}
          className="nba-layer core-layer"
          alt=""
          aria-hidden
          style={{ filter: `url(#${uid}-turb)` }}
        />

        {/* sharp overlay (highlights & mask) */}
        <img
          src={src}
          className="nba-layer highlight-layer"
          alt=""
          aria-hidden
        />

        {/* moving color gradient mask for shimmer */}
        <div className="nba-gradient-mask" aria-hidden />
      </div>

      <style jsx>{`
        .nba-root {
          position: relative;
          display: inline-block;
          isolation: isolate;
          pointer-events: none;
          user-select: none;
          will-change: transform;
        }

        .nba-layer-wrap {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: visible;
          transform-origin: 50% 50%;
          /* slight parallax rotation animation */
          animation: nba-rotate 14s ease-in-out infinite;
        }

        /* Each layer fills the container */
        .nba-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform-origin: 50% 50%;
          display: block;
        }

        /* glow: big blur + blend */
        .glow-layer {
          z-index: 1;
          mix-blend-mode: screen;
          filter: blur(30px) saturate(1.8) contrast(1.05);
          opacity: 0.95;
          animation: nba-glow-hue 8s linear infinite;
        }

        /* core: displaced, slightly darker for depth */
        .core-layer {
          z-index: 5;
          opacity: 1;
          mix-blend-mode: normal;
          filter: drop-shadow(0 8px 40px rgba(0,0,0,0.45));
          animation: nba-core-move 9s ease-in-out infinite;
        }

        /* highlight overlay: crisp, with mask to show shimmer */
        .highlight-layer {
          z-index: 10;
          mix-blend-mode: screen;
          opacity: 0.95;
          filter: contrast(1.05) brightness(1.05);
          mask-image: linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%);
          animation: nba-highlight-subtle 5.2s linear infinite;
        }

        .nba-gradient-mask {
          position: absolute;
          z-index: 12;
          inset: -10% -10%;
          background: radial-gradient(circle at 20% 20%, rgba(255,0,255,0.12), transparent 14%),
                      radial-gradient(circle at 80% 80%, rgba(0,217,255,0.10), transparent 18%),
                      linear-gradient(90deg, rgba(255,0,255,0.04), rgba(0,217,255,0.04));
          mix-blend-mode: screen;
          filter: blur(24px) saturate(1.2);
          pointer-events: none;
          animation: nba-orb 10s ease-in-out infinite;
        }

        /* animations */
        @keyframes nba-rotate {
          0% { transform: rotate(-0.8deg) translateY(0); }
          25% { transform: rotate(0.6deg) translateY(-6px); }
          50% { transform: rotate(-0.5deg) translateY(0); }
          75% { transform: rotate(0.9deg) translateY(6px); }
          100% { transform: rotate(-0.8deg) translateY(0); }
        }

        @keyframes nba-glow-hue {
          0% { filter: blur(30px) saturate(1.8) hue-rotate(0deg); opacity: 0.9; }
          33% { filter: blur(28px) saturate(2.0) hue-rotate(40deg); opacity: 1; }
          66% { filter: blur(26px) saturate(1.9) hue-rotate(210deg); opacity: 0.95; }
          100% { filter: blur(30px) saturate(1.8) hue-rotate(0deg); opacity: 0.9; }
        }

        @keyframes nba-core-move {
          0% { transform: translate3d(0,0,0) scale(1) rotate(0); filter: url(#${uid}-turb); }
          25% { transform: translate3d(-6px,-4px,0) scale(1.01) rotate(-0.6deg); }
          50% { transform: translate3d(0,6px,0) scale(0.995) rotate(0.2deg); }
          75% { transform: translate3d(6px,-2px,0) scale(1.005) rotate(0.6deg); }
          100% { transform: translate3d(0,0,0) scale(1) rotate(0); }
        }

        @keyframes nba-highlight-subtle {
          0% { transform: translateX(-30%); opacity: 0.45; }
          50% { transform: translateX(30%); opacity: 0.85; }
          100% { transform: translateX(-30%); opacity: 0.45; }
        }

        @keyframes nba-orb {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.9; }
          50% { transform: translate3d(6px,-12px,0) scale(1.04); opacity: 0.98; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: 0.9; }
        }

        /* hover (if pointer allowed) intensifies motion briefly */
        @media (hover: hover) {
          .nba-root:hover .nba-layer-wrap {
            animation-duration: 10s;
            transform: scale(1.03);
          }
          .nba-root:hover .glow-layer { filter: blur(36px) saturate(2.2) brightness(1.05); }
        }

        /* reduced motion: pause complex animations and keep subtle easing */
        @media (prefers-reduced-motion: reduce) {
          .nba-layer-wrap,
          .glow-layer,
          .core-layer,
          .highlight-layer,
          .nba-gradient-mask {
            animation: none !important;
            transition: none !important;
          }
        }

        /* responsive: smaller blur on small screens for perf */
        @media (max-width: 640px) {
          .glow-layer { filter: blur(18px) saturate(1.6); }
          .nba-gradient-mask { filter: blur(12px); }
        }
      `}</style>
    </div>
  );
}
