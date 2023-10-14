import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Boardgame Project",
  description: "This project is managed by oxboxx.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="ku-obp"
        >
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
