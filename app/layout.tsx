import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/provider/theme-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Boardgame Project",
  description: "This project is managed by oxboxx.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
