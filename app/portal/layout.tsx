import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner portal | THE PEOPLE CONSTRUCTION ltd",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portal-mirror-bg text-offwhite antialiased">{children}</div>
  );
}
