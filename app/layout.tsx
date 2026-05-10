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
  title:
    "THE PEOPLE CONSTRUCTION ltd | Construction & Engineering | Rwanda",
  description:
    "Structural design, architecture, topography, consultancy, and software training (CSI SAFE, ETABS, SAP2000, AutoCAD, Lumion) — projects across Rwanda.",
  keywords: [
    "construction Rwanda",
    "structural engineer Kigali",
    "Masaka Kicukiro Musanze Rusizi construction",
    "ETABS training Rwanda",
    "civil engineering training",
  ],
  openGraph: {
    title: "THE PEOPLE CONSTRUCTION ltd",
    description: "Building Rwanda’s future — real projects, real training.",
    url: "https://thepeopleunitedltd.com",
    siteName: "THE PEOPLE CONSTRUCTION ltd",
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
