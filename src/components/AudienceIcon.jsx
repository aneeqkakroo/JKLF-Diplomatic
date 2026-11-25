import { Landmark, Newspaper, Scale, Users } from "lucide-react";

const icons = { Landmark, Newspaper, Scale, Users };

export default function AudienceIcon({ name, size = 24 }) {
  const Icon = icons[name] || Landmark;

  return <Icon size={size} aria-hidden="true" />;
}
