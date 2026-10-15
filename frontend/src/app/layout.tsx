import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: "ASHU ESTATES | Spaces Beyond Ordinary",
  description:
    "Discover considered living, exceptional architecture, and distinctive residences with ASHU ESTATES.",
  applicationName: "ASHU ESTATES",
  keywords: [
    "ASHU ESTATES",
    "Luxury Real Estate",
    "Luxury Properties",
    "Dhaka Real Estate",
    "Premium Residences",
    "Property Development",
  ],
  openGraph: {
    title: "ASHU ESTATES | Spaces Beyond Ordinary",
    description:
      "A considered approach to contemporary living.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#292724",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
   
<body>
  <FavoritesProvider>
    <CompareProvider>{children}</CompareProvider>
  </FavoritesProvider>
</body>

  </html>
);
}
