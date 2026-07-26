// lucide-react removed third-party brand/logo icons (Facebook, Instagram, YouTube)
// starting from its newer major versions, so these are drawn as small inline SVGs
// styled to match lucide's 24x24 stroke icon look. Swap for real brand assets if preferred.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function FacebookIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M14 9.5V7.2c0-.9.6-1.2 1.4-1.2H17V3h-2.7C11.9 3 10 4.7 10 7.4v2.1H8v3h2V21h3v-8.5h2.3l.4-3H13z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
