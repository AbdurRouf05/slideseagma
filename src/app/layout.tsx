import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShapeGrid from "@/components/react-bits/ShapeGrid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEAGMA PRESENCE - Presentation",
  description: "Bold Minimalist Slide Deck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ShapeGrid 
          speed={0.5}
          size={40}
          spacing={40}
          direction='diagonal'
          borderColor='#0ea5e9'
          hoverColor='#facc15'
          shape='square'
          hoverTrailAmount={0}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
