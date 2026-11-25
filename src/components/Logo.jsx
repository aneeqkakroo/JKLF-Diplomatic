// The JKLF flag (green over red, white triangle at the hoist) as a small mark.
export default function Logo({ size = 44 }) {
  return (
    <svg
      className="logo-flag"
      viewBox="0 0 60 40"
      width={size}
      height={(size * 2) / 3}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="60" height="20" fill="#0b6b3a" />
      <rect y="20" width="60" height="20" fill="#b52025" />
      <path d="M0 0 L16 20 L0 40 Z" fill="#ffffff" />
    </svg>
  );
}
