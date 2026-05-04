import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The People United Ltd | Construction & Engineering | Kigali, Rwanda",
  description:
    "Professional structural design, architecture, topography survey, consultancy, real estate, and civil engineering software training in Rwanda.",
  keywords: [
    "construction Rwanda",
    "structural engineer Kigali",
    "architecture design Rwanda",
    "civil engineering training",
  ],
  openGraph: {
    title: "The People United Ltd",
    description: "Building Rwanda’s Future, One Structure at a Time",
    url: "https://thepeopleunitedltd.com",
    siteName: "The People United Ltd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-bg-dark text-offwhite antialiased">
        {children}
      </body>
    </html>
  );
}
