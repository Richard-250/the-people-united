import {
  Building2,
  PenTool,
  MapPin,
  Briefcase,
  Home,
  GraduationCap,
  Monitor,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Building2,
  PenTool,
  MapPin,
  Briefcase,
  Home,
  GraduationCap,
  Monitor,
};

export default function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Building2;
  return <Icon className={className} aria-hidden />;
}
