import {
  ShieldCheck,
  Clock,
  DollarSign,
  Users,
  Globe,
  Award,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  ShieldCheck,
  Clock,
  DollarSign,
  Users,
  Globe,
  Award,
};

export default function WhyUsIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? ShieldCheck;
  return <Icon className={className} aria-hidden />;
}
